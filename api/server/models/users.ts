import Mongoose from "mongoose";

interface User {
    marketId: string;
    marketName: string;
    marketAddress: string;
    marketPhone: string;
    employees: UserLogin[];
}
interface UserLogin {
    username: string;
    password: string;
    role: string;
}

const EmployeeSchema = new Mongoose.Schema<UserLogin>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const schema = new Mongoose.Schema<User>({
    marketId: { type: String, required: true, unique: true },
    marketName: { type: String, required: true },
    marketAddress: { type: String, required: true },
    marketPhone: { type: String, required: true },
    employees: { type: [EmployeeSchema], required: true },

});

const UserModel = Mongoose.model("user", schema);

export default UserModel;