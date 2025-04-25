import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

// Define TypeScript interfaces for our data structures
interface Feedback {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  category?: string;
}

interface FeedbackProps {
  initialFeedbacks?: Feedback[];
  onAddFeedback?: (feedback: Omit<Feedback, 'id' | 'date'>) => void;
}

const MyFeedback: React.FC<FeedbackProps> = ({ initialFeedbacks = [] }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
 
 
  const navigate = useNavigate();

  useEffect(() => {
    // Update feedbacks if initialFeedbacks change
    setFeedbacks(initialFeedbacks);
  }, [initialFeedbacks]);

    

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Feedback</h1>
        <Button 
          onClick={() => navigate('/add-feedback')}
          className="px-4 py-2 text-white rounded "
        >
          Add Feedback
        </Button>
      </div>

      {feedbacks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No feedback entries yet
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div 
              key={feedback.id}
              className="p-4 border rounded shadow bg-white"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{feedback.userName}</h3>
                  <p className="text-sm text-gray-500">User ID: {feedback.userId}</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-medium">{feedback.rating}/5</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star}
                        className={`text-xl ${star <= feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {feedback.category && (
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mb-2">
                  {feedback.category}
                </span>
              )}
              
              <p className="mb-2">{feedback.comment}</p>
              <p className="text-xs text-right text-gray-500">
                {new Date(feedback.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFeedback;