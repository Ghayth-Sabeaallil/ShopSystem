import Mongoose from "mongoose";


interface User {
    username: string;
    password: string;
}

const schema = new Mongoose.Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserModel = Mongoose.model("user", schema);

export default UserModel;