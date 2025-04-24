import { FeedbackItem } from '../components/FeedbackItem';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Types
interface Comment {
  id: string;
  userName: string;
  text: string;
  createdAt: string;
  isAdmin: boolean;
}

interface Feedback {
  id: string;
  userName: string;
  title: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'resolved' | 'in-progress' | 'pending'; // Add more statuses if needed
  imageUrl: string | null;
  comments: Comment[];
}

export function MyFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch user's feedback from API
    // Placeholder data
    setTimeout(() => {
      setFeedbacks([
        {
          id: '1',
          userName: 'John Doe',
          title: 'Great service overall',
          rating: 4,
          comment: 'I really enjoyed the service. The staff were friendly and attentive.',
          createdAt: new Date(2025, 3, 15).toISOString(),
          status: 'resolved',
          imageUrl: null,
          comments: [
            {
              id: '101',
              userName: 'Support Team',
              text: "Thank you for your positive feedback! We're glad you enjoyed our service.",
              createdAt: new Date(2025, 3, 16).toISOString(),
              isAdmin: true
            }
          ]
        },
        {
          id: '2',
          userName: 'John Doe',
          title: 'Website navigation needs improvement',
          rating: 3,
          comment: 'The website is good but navigation could be more intuitive.',
          createdAt: new Date(2025, 3, 10).toISOString(),
          status: 'in-progress',
          imageUrl: '/api/placeholder/400/320',
          comments: []
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading your feedback...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-600 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Feedback</h1>
        <Link to="/submit-feedback">
          <Button>Submit New Feedback</Button>
        </Link>
      </div>

      {feedbacks.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">You haven't submitted any feedback yet.</p>
          <Link to="/submit-feedback">
            <Button>Submit Your First Feedback</Button>
          </Link>
        </div>
      ) : (
        <div>
          {feedbacks.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
}
