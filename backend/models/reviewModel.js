import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    professor: {
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
});

export const Review = mongoose.model(
    "review entry",
    reviewSchema,
    "review-collection"
);
