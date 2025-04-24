import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { getFeedbackById } from '@/services/feedbackApi/feedbackApi';
import renderStars from '@/helpers/Renderstars';

interface Feedback {
    userId: any;
    id: string;
    userName: string;
    email: string;
    text: string;
    createdAt: string;
    rating: number;
}

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    feedbackId: string | null;
}

const DetailModal: React.FC<DetailModalProps> = ({
    isOpen,
    onClose,
    feedbackId,
}) => {
    const [feedback, setFeedback] = useState<Feedback | any>(null);
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState('');
    const [sendingReply, setSendingReply] = useState(false);
    console.log(feedbackId);

    useEffect(() => {
        if (!isOpen || !feedbackId) return;

        const fetchFeedback = async () => {
            setLoading(true);
            try {
                const res = await getFeedbackById(feedbackId);
                setFeedback(res.data.feedback);
            } catch (err) {
                console.error('Failed to fetch feedback', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [isOpen, feedbackId]);

    const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReply(e.target.value);
    };

    const handleSendReply = async () => {
        if (!reply.trim()) return;
        
        setSendingReply(true);
        try {
            // Replace this with your actual API call to send the reply
            // Example: await sendFeedbackReply(feedbackId, reply);
            console.log('Sending reply:', { feedbackId, reply });
            
            // Reset the reply field after successful submission
            setReply('');
            // You might want to show a success message or close the modal
        } catch (err) {
            console.error('Failed to send reply', err);
        } finally {
            setSendingReply(false);
        }
    };

    if (!feedbackId || (!feedback && !loading)) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                {loading ? (
                    <div className="p-4 text-center text-muted-foreground">Loading...</div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>{feedback?.text}</DialogTitle>
                            <DialogDescription>
                                Submitted by {feedback?.userId?.name || feedback?.userName}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex space-x-2 items-center">
                                    <span className="text-sm font-medium">Rating:</span>
                                    <span className="text-sm">{renderStars(feedback?.rating)}</span>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm font-medium mb-2">Contact Information:</p>
                                <div className="text-sm">
                                    <p><span className="font-medium">Name:</span> {feedback?.userId?.name}</p>
                                    <p><span className="font-medium">Email:</span> {feedback?.userId?.email}</p>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm font-medium mb-2">Feedback Message:</p>
                                <div className="bg-gray-50 p-4 rounded-md text-sm max-h-60 overflow-y-auto">
                                    {feedback?.text}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm font-medium mb-2">Reply to Feedback:</p>
                                <Textarea
                                    placeholder="Type your reply here..."
                                    value={reply}
                                    onChange={handleReplyChange}
                                    className="min-h-24 resize-none"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button 
                                onClick={handleSendReply} 
                                disabled={!reply.trim() || sendingReply}
                            >
                                {sendingReply ? 'Sending...' : 'Send Reply'}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default DetailModal;