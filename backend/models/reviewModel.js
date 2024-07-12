import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        anon: {
            type: Boolean,
            required: true,
        },
        bu_email: {
            type: String,
            required: true,
        },
        course_id: {
            type: String,
            required: true,
        },
        professor: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        usefulness: {
            type: Number,
            required: true,
        },
        difficulty: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    { versionKey: false }
);

const mongoDB = mongoose.createConnection(process.env.MONGODBURI);

export const Reviews = mongoDB.model(
    "review entry",
    reviewSchema,
    "review-collection"
);
