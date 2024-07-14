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

const membersMongoDB = mongoose.createConnection(
    process.env.MONGODBURI_MEMBERS
);
membersMongoDB.on("error", (error) => {
    console.log("Error connecting to Members MongoDB:", error);
});

export const Members = membersMongoDB.model(
    "Member Element",
    memberSchema,
    "user-collection"
);
