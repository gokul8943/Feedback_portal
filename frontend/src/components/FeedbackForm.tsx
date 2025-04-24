import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';
import { Star } from 'lucide-react';

export function FeedbackForm() {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRatingClick = (value:any) => {
    setRating(value);
  };
  
  const handleSubmit = async (e:any) => {
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
      // Handle feedback submission with API
      // Placeholder for submission logic
      setTimeout(() => {
        setSuccess('Feedback submitted successfully!');
        setTitle('');
        setComment('');
        setRating(0);
        setImage(null);
        setPreview('');
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
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
              <Label htmlFor="title">Feedback Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Brief title for your feedback"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`cursor-pointer ${
                      value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => handleRatingClick(value)}
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
                onChange={(e:any) => setComment(e.target.value)} 
                placeholder="Share your experience and suggestions..."
                rows={5}
                required
              />
            </div>
            
            <div className="space-y-2">
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
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
