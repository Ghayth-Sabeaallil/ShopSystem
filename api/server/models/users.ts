import Mongoose from "mongoose";

interface User {
    marketId: string;
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
    employees: { type: [EmployeeSchema], required: true },

});

const UserModel = Mongoose.model("user", schema);

export default UserModel;