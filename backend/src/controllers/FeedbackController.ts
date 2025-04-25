import FeedbackModel from "../models/feedback/feedbackModel";
import { Request, Response } from "express";


export const createFeedback = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const { comment, rating } = req.body;        

        if (!comment || rating == null) {
            return res.status(400).json({ message: "Missing required fields: text or rating" });
        }

        const parsedRating = Number(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
        }

        const newFeedback = new FeedbackModel({
            userId: userId,
            text:comment,
            rating: parsedRating,
            createdAt: new Date()
        });

        const savedFeedback = await newFeedback.save();

        return res.status(201).json({
            message: "Feedback created successfully",
            feedback: savedFeedback
        });
    } catch (error) {
        console.error("Error creating feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = await FeedbackModel.find().populate({path:'userId'});
        return res.status(200).json({ message: "Feedback fetched successfully", feedback });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
  

export const getFeedbackById = async (req: Request, res: Response) => {
    try {
        const { feedbackId } = req.params;
        const feedback = await FeedbackModel.findById(feedbackId).populate('userId');
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        return res.status(200).json({ message: "Feedback fetched successfully", feedback });
    } catch (error) {
        console.error("Error fetching feedback:", error);
    }
}

export const deleteFeedback = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedFeedback = await FeedbackModel.findByIdAndDelete(id);
        if (!deletedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        return res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateFeedback = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { text, rating } = req.body;

        if (!text || rating == null) {
            return res.status(400).json({ message: "Missing required fields: text or rating" });
        }

        const parsedRating = Number(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
        }

        const updatedFeedback = await FeedbackModel.findByIdAndUpdate(
            id,
            { text, rating: parsedRating },
            { new: true }
        );

        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        return res.status(200).json({ message: "Feedback updated successfully", feedback: updatedFeedback });
    } catch (error) {
        console.error("Error updating feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getFeedbackByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const feedback = await FeedbackModel.find({ userId }).populate('userId');
        return res.status(200).json({ message: "Feedback fetched successfully", feedback });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
