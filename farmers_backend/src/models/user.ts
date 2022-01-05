//This is the MongoDB model user, which is responsible for saving and fetching user info. 

import { model, Model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { User } from "../types";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        require: true
    },
    data: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DataPoint'
        }
    ]
});

userSchema.plugin(mongooseUniqueValidator);

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id as string;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const UserModel: Model<User> = model('User', userSchema);

export default UserModel;