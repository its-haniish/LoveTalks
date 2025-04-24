import { ChatSession } from "../models";
import { Request, Response } from "express";


export const getAllChatSessions = async (req: Request, res: Response) => {
    try {
        const {mentorId, userId} = req.body;
        if(mentorId){
            const sessions = await ChatSession.find({ mentorId });
            if (!sessions) return res.status(404).json({ message: "No chat sessions found" });
            return res.status(200).json({ sessions, message: "Chat sessions retrieved successfully" });
        }else if(userId){
            const sessions = await ChatSession.find({ userId });
            if (!sessions) return res.status(404).json({ message: "No chat sessions found" });
            return res.status(200).json({ sessions, message: "Chat sessions retrieved successfully" });
        }else{
            return res.status(400).json({ message: "Please provide either mentorId or userId" });
        }
        
    } catch (error) {
        console.log("Error in getAllChatSessions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}; 
    
