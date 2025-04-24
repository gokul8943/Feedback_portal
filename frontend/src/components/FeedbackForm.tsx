import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Star } from 'lucide-react';
import { addFeedback } from '@/services/feedbackApi/feedbackApi';
import useAuthStore from '@/store/AuthStore';

// Define the type for feedback data
interface FeedbackData {
  comment: string;
  rating: number;
  image: File | null;
}

// Define props for the component
interface FeedbackFormProps {
  onSubmit?: (data: FeedbackData) => Promise<void>;
  initialData?: Partial<FeedbackData>;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  initialData = {}
}) => {
  // State for form fields
  const [comment, setComment] = useState<string>(initialData.comment || '');
  const [rating, setRating] = useState<number>(initialData.rating || 0);
  const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string>('');
  

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { authState } = useAuthStore();
  const userId:any = authState.user?.id

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const file = e.target.files?.[0] || null;
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  

  const handleRatingClick = (value: number): void => {
    setRating(value);
  };
  
 
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
 
    if (rating === 0) {
      setError('Please select a rating');
      setIsLoading(false);
      return;
    }
    
    try {
      const feedbackData: FeedbackData = {
        comment,
        rating,
        image
      };
      
      const response = addFeedback(userId,feedbackData)
      if((await response).status === 200 || (await response).status === 201){
        setSuccess('Feedback submitted successfully!');
      }else{
        setError('Failed to submit feedback. Please try again.');
      }
    //   // Call onSubmit prop if provided, otherwise simulate submission
    //   if (onSubmit) {
    //     await onSubmit(feedbackData);
    //     setSuccess('Feedback submitted successfully!');
    //   } else {
    //     // Simulate API call
    //     await new Promise(resolve => setTimeout(resolve, 1000));
    //     setSuccess('Feedback submitted successfully!');
    //   }
      
      // Reset form fields
      setComment('');
      setRating(0);
      setImage(null);
    //   setPreview('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Submit Feedback</CardTitle>
        <CardDescription>We value your feedback to improve our services</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-6">
            
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    size={24}
                    className={`cursor-pointer ${
                      value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => handleRatingClick(value)}
                    data-testid={`star-rating-${value}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating > 0 ? `${rating} of 5 stars` : 'Select a rating'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comment">Feedback Details</Label>
              <Textarea 
                id="comment" 
                value={comment} 
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)} 
                placeholder="Share your experience and suggestions..."
                rows={5}
                required
              />
            </div>
            
            {/* <div className="space-y-2">
              <Label htmlFor="image">Upload Image (Optional)</Label>
              <Input 
                id="image" 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {preview && (
                <div className="mt-2">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-40 rounded-md"
                  />
                </div>
              )}
            </div> */}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};