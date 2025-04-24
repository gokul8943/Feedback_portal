import { Request, Response } from "express";
import userModel from "../models/user/userModel";
import Feedback from "../models/feedback/feedbackModel";

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find();
        return res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const replyToFeedback = async (req: Request, res: Response) => {
    const { feedbackId } = req.params;
  const { reply } = req.body;
  console.log(feedbackId);
  console.log(reply);
  
    if (!reply) return res.status(400).json({ message: 'Reply is required' });

    try {
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

        feedback.reply = reply;
        await feedback.save();

        res.status(200).json({ message: 'Reply added successfully', feedback });
    } catch (error) {
        console.error('Error replying to feedback:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

