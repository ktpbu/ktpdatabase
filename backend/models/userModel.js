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

mongoose.connect(process.env.MONGODBURI);
mongoose.connection.on("error", (error) => {
    console.log("Error connecting to MongoDB:", error);
});

export const Users = mongoose.model(
    "user entry",
    userSchema,
    "user-collection"
);
