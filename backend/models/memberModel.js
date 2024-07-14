import mongoose from "mongoose";

const memberSchema = mongoose.Schema(
    {
        BUEmail: {
            type: String,
            required: true,
        },
        FirstName: {
            type: String,
            required: true,
        },
        LastName: {
            type: String,
            required: true,
        },
        PhoneNumber: {
            type: String,
            required: true,
        },
        Birthday: {
            type: String,
            required: false,
        },
        GradYear: {
            type: Number,
            required: true,
        },
        Colleges: {
            type: [String],
            required: true,
        },
        Major: {
            type: [String],
            required: true,
        },
        Minor: {
            type: [String],
            required: false,
        },
        Position: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

mongoose
    .connect(process.env.MONGODBURI_MEMBERS)
    .catch((error) => console.log(error));

export const Members = mongoose.model(
    "Member Element",
    memberSchema,
    "user-collection"
);
