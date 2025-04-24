import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


const HomePage = () => {

const navigate = useNavigate()

const handleAddFeedback = () =>{
   navigate('/add-feedback')
}

    return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 py-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to FeedbackHub</h1>
        
        <p className="mt-4 text-lg text-gray-600">
          Your platform for collecting and managing customer feedback efficiently.
          Track suggestions, identify trends, and make data-driven decisions to improve
          your product.
        </p>
        
        <div className="mt-8">
          <Button 
          onClick={handleAddFeedback}
            className="px-6 py-3  text-white font-medium rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors"
          >
            Add Feedback
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage