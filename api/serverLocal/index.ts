import { SerialPort } from "serialport";
import { createCanvas, loadImage } from "canvas";
import bwipjs from "bwip-js";
import { createServer } from "http";

const server = createServer((req, res) => {
    // Set CORS headers for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');  // or specify your frontend origin instead of '*'
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Respond to preflight requests quickly
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === "POST" && req.url === "/print") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            try {
                const { items, barcodeText, lang, marketName, marketAddress, marketPhone } = JSON.parse(body);
                await printReceipt(items, barcodeText, lang, marketName, marketAddress, marketPhone);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});


server.listen(4000, () => console.log("Server running at http://localhost:4000"));

function canvasToEscPosBitmap(canvas: any) {
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;
    const widthBytes = Math.ceil(width / 8);
    const bufferSize = 8 + widthBytes * height;
    const buffer = Buffer.alloc(bufferSize);

    buffer[0] = 0x1d;
    buffer[1] = 0x76;
    buffer[2] = 0x30;
    buffer[3] = 0x00;
    buffer[4] = widthBytes & 0xff;
    buffer[5] = (widthBytes >> 8) & 0xff;
    buffer[6] = height & 0xff;
    buffer[7] = (height >> 8) & 0xff;

    for (let y = 0; y < height; y++) {
        for (let xByte = 0; xByte < widthBytes; xByte++) {
            let byte = 0x00;
            for (let bit = 0; bit < 8; bit++) {
                const x = xByte * 8 + bit;
                if (x >= width) continue;
                const idx = (y * width + x) * 4;
                const [r, g, b, a] = [
                    imageData.data[idx],
                    imageData.data[idx + 1],
                    imageData.data[idx + 2],
                    imageData.data[idx + 3],
                ];
                const gray = 0.299 * r + 0.587 * g + 0.114 * b;
                if (a > 128 && gray < 128) {
                    byte |= 0x80 >> bit;
                }
            }
            buffer[8 + y * widthBytes + xByte] = byte;
        }
    }

    return buffer;
}

// Generate & print receipt
export async function printReceipt(items: any[], barcodeText: string, lang: string, marketName: string, marketAddress: string, marketPhone: string) {
    const width = 576;
    const fontSize = 36;
    const lineHeight = fontSize + 20;
    const margin = 40;
    const itemCount = items.length;
    const canvasHeight =
        240 + lineHeight * itemCount + 80 + 200 + 200;

    const canvas = createCanvas(width, canvasHeight);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.direction = "rtl";

    ctx.font = `bold ${fontSize + 4}px Arial`;
    ctx.fillText(marketName, width / 2, margin);
    ctx.font = `${fontSize - 4}px Arial`;
    ctx.fillText(marketAddress, width / 2, margin + 40);

    const formattedDate = new Date().toLocaleDateString("en-GB");
    ctx.fillText(`${lang === "ar" ? "التاريخ" : "Date"}: ${formattedDate}`, width / 2, margin + 80);

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillText(`${lang == "ar" ? "إيصال الدفع" : "Reciept"}`, width / 2, margin + 130);

    const centerX = width / 2;
    const colOffsets = { item: 150, qty: 0, price: -150 };

    ctx.fillText(`${lang == "ar" ? "المنتج" : "Item"}`, centerX + colOffsets.item, margin + 180);
    ctx.fillText(`${lang == "ar" ? "الكمية" : "Amount"}`, centerX + colOffsets.qty, margin + 180);
    ctx.fillText(`${lang == "ar" ? "السعر" : "Price"}`, centerX + colOffsets.price, margin + 180);

    ctx.font = `${fontSize}px Arial`;
    items.forEach((row, i) => {
        const y = margin + 180 + lineHeight * (i + 1);
        ctx.fillText(row.name, centerX + colOffsets.item, y);
        ctx.fillText(row.amount, centerX + colOffsets.qty, y);
        ctx.fillText(row.sale_price ? row.sale_price : row.selling_price, centerX + colOffsets.price, y);
    });

    const sepY = margin + 180 + lineHeight * (items.length + 1);
    ctx.beginPath();
    ctx.moveTo(margin, sepY);
    ctx.lineTo(width - margin, sepY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    const total = items.reduce((sum, item) => {
        const priceStr = item.sale_price ? item.sale_price : item.selling_price;

        // Clean the price string
        const cleanedPriceStr = String(priceStr)
            .replace(/[^\d.]/g, "")
            .replace(/٫/g, ".");

        const price = parseFloat(cleanedPriceStr);
        const amount = item.amount || 1; // default to 1 if amount missing

        // Multiply price by amount and add to sum, handle NaN safely
        return sum + (isNaN(price) ? 0 : price * amount);
    }, 0);

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillText(`${lang == "ar" ? "الاجمالي" : "Total"}`, centerX + colOffsets.item, sepY + lineHeight);
    ctx.fillText(`${Math.round(total * 100) / 100}`, centerX + colOffsets.price, sepY + lineHeight);

    ctx.font = `bold ${fontSize + 6}px Arial`;
    ctx.fillText(`${lang == "ar" ? "شكرا لتسوقكم معنا" : "Thank you"}`, width / 2, sepY + lineHeight * 2.4);
    ctx.font = `${fontSize - 6}px Arial`;
    ctx.fillText(`${lang == "ar" ? "هاتف" : "Tel"}: ${marketPhone}`, width / 2, sepY + lineHeight * 3.2);

    const pngBuffer = await bwipjs.toBuffer({
        bcid: "ean13",
        text: barcodeText,
        scale: 3,
        height: 15,
        includetext: true,
        textxalign: "center",
        backgroundcolor: "FFFFFF",
        paddingwidth: 0,      // keep sides tight
        paddingheight: 10
    });

    const img = await loadImage(pngBuffer);
    const barcodeY = sepY + lineHeight * 4;
    ctx.drawImage(img, (width - img.width) / 2, barcodeY);

    const bitmapBuffer = canvasToEscPosBitmap(canvas);

    const port = new SerialPort({
        path: "COM4",
        baudRate: 9600,
    });

    return new Promise<void>((resolve, reject) => {
        port.on("open", () => {
            const init = Buffer.from([0x1b, 0x40]);
            const cut = Buffer.from([0x1d, 0x56, 0x41, 0x10]);
            const data = Buffer.concat([init, bitmapBuffer, cut]);

            port.write(data, (err) => {
                if (err) reject(err);
                else {
                    port.close();
                    resolve();
                }
            });
        });

        port.on("error", reject);
    });
}