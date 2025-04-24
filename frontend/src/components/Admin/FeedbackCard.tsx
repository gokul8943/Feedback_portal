import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'


interface Feedback {
  userId: any;
  id: string;
  userName: string;
  email: string;
  text: string;
  createdAt: string;
  rating: number
}
interface FeedbackCardProps {
  feedbackItems: Feedback[];
  onDelete?: (id: string) => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  feedbackItems,
}) => {

console.log(feedbackItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>text</TableHead>
              <TableHead>raitng</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbackItems.length > 0 ? (
              feedbackItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item?.userId.name}</div>
                    <div className="text-sm text-muted-foreground">{item.email}</div>
                  </TableCell>
                  <TableCell>{item.text}</TableCell>
                  <TableCell>{item.rating}</TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center p-3.5">
                  No feedback submissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;