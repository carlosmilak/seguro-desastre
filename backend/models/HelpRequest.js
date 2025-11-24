import mongoose from "mongoose";

const HelpRequestSchema = new mongoose.Schema({
    userId: String,
    type: String,
    description: String,
    lat: Number,
    lng: Number,
    createdAt: Date
});

export default mongoose.model("HelpRequest", HelpRequestSchema);
