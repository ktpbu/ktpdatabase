import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
        bu_email: {
            type: String,
            required: true,
        },
        class: {
            type: String,
            required: true,
        },
        is_admin: {
            type: Boolean,
            required: true,
        },
    },
    { versionKey: false }
);

mongoose.connect(process.env.MONGODBURI).catch((err) => console.log(err));

export const Users = mongoose.model(
    "user entry",
    userSchema,
    "user-collection"
);
