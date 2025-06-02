import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from "../locales/ar.json"
import en from "../locales/en.json"

i18n
    .use(initReactI18next)
    .init({
        lng: 'ar',
        fallbackLng: 'ar',
        resources: {
            en: { translation: en },
            ar: { translation: ar },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
