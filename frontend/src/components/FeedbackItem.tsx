import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { Star, MessageCircle, User } from 'lucide-react';
import { useState } from 'react';

export function FeedbackItem({ feedback, isAdmin = false }) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Handle comment submission with API
      // Placeholder for submission logic
      setTimeout(() => {
        setComment('');
        setShowCommentForm(false);
        setIsSubmitting(false);
        // Would refresh feedback with new comment in real implementation
      }, 1000);
    } catch (err) {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-medium">{feedback.userName}</span>
            </div>
            <h3 className="text-lg font-semibold">{feedback.title}</h3>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
          {isAdmin && (
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                feedback.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                feedback.status === 'in-progress' ? 'bg-orange-100 text-orange-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {feedback.status === 'new' ? 'New' : 
                 feedback.status === 'in-progress' ? 'In Progress' : 'Resolved'}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-line">{feedback.comment}</p>
        {feedback.imageUrl && (
          <div className="mt-4">
            <img 
              src={feedback.imageUrl} 
              alt="Feedback image" 
              className="max-h-60 rounded-md"
            />
          </div>
        )}
        
        {feedback.comments && feedback.comments.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Responses</h4>
            <div className="space-y-4">
              {feedback.comments.map((comment, index) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center mb-1">
                    <span className={`font-medium ${comment.isAdmin ? 'text-blue-600' : ''}`}>
                      {comment.isAdmin ? 'Support Team' : comment.userName}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isAdmin && (
          <div className="w-full">
            {showCommentForm ? (
              <form onSubmit={handleCommentSubmit} className="w-full">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type your response..."
                  className="mb-2"
                  required
                />
                <div className="flex space-x-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Response'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCommentForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <Button 
                variant="outline" 
                className="flex items-center" 
                onClick={() => setShowCommentForm(true)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Respond
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}