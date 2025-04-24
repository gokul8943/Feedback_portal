import  { useEffect, useState } from "react"
import FeedbackCard from "@/components/Admin/FeedbackCard"
import { getFeedback } from "@/services/feedbackApi/feedbackApi"

interface Feedback {
  id: string
  userName: string
  email: string
  text: string
  dateSubmitted: string
  rating: number
}

const AdminDashBoard = () => {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await getFeedback()// Adjust the URL if needed
        setFeedbackItems(res.data.feedback)
      } catch (error) {
        console.error("Failed to fetch feedback:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  return (
    <div className="mb-10">
      {loading ? (
        <div className="text-center text-muted-foreground">Loading feedback...</div>
      ) : (
        <FeedbackCard feedbackItems={feedbackItems} />
      )}
    </div>
  )
}

export default AdminDashBoard
