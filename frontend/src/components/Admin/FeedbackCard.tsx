import React, { useEffect, useState } from 'react'
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

import renderStars from '@/helpers/Renderstars'
import { Button } from '../ui/button'
import DetailModal from './DetailModal'
import { getFeedbackById } from '@/services/feedbackApi/feedbackApi'

interface Feedback {
  userId: any;
  _id: string;
  userName: string;
  email: string;
  text: string;
  createdAt: string;
  rating: number;
}

interface FeedbackDetails {
  userId: any;
  _id: string;
  userName: string;
  email: string;
  text: string;
  createdAt: string;
  rating: number;
}

interface FeedbackCardProps {
  feedbackItems: Feedback[];
  onDelete?: (id: string) => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedbackItems }) => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [feedbackDetail, setFeedbackDetail] = useState<FeedbackDetails | null>(null)
  console.log(feedbackDetail);

  const handleOpenDetails = (_id: string) => {
    setSelectedId(_id)
    setOpenModal(true)
  }

console.log(feedbackItems);

  useEffect(() => {
    const fetchFeedbackDetail = async () => {
      if (!selectedId) return
      try {
        const res = await getFeedbackById(selectedId)
        const data = res.data
        setFeedbackDetail(data.feedback)
      } catch (error) {
        console.error('Failed to fetch feedback detail:', error)
      }
    }

    if (openModal) {
      fetchFeedbackDetail()
    }
  }, [selectedId, openModal])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Feedback Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>raitng</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackItems.length > 0 ? (
                feedbackItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="font-medium">{item?.userId.name}</div>
                      <div className="text-sm text-muted-foreground">{item.email}</div>
                    </TableCell>
                    <TableCell>{item.text}</TableCell>
                    <TableCell>{renderStars(item.rating)}</TableCell>
                    <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleOpenDetails(item?._id)}
                        className="px-3 py-1 text-sm font-medium text-white hover:underline"
                      >
                        Details
                      </Button>
                    </TableCell>
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
        <DetailModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          feedbackId={selectedId}
        />
      </Card>
    </>
  )
}

export default FeedbackCard
