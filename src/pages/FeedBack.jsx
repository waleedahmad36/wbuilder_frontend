import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaPaperPlane } from 'react-icons/fa'  // Using a paper plane icon
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { rootUrl } from '../constants'
import AllFeedbacks from '../components/AllFeedbacks'

const FeedBack = () => {
    const user = useRecoilValue(userAtom);
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [feedbackCount, setFeedbackCount] = useState(0);

  // Handle feedback submission
  const handleSubmit = async () => {
    if (message.trim()) {
      setLoading(true)

      try {
        const userId = user._id;  // Replace with the logged-in user's ID
        const response = await axios.post(`${rootUrl}/api/v1/feedback`, {
          userId,
          message
        })

        // Handle the response (success)
        setSuccess('Feedback submitted successfully!')
        toast.success('Thank you for your feedback!');
        setFeedbackCount(feedbackCount + 1);
        setMessage('')
      } catch (error) {
        setSuccess('Something went wrong, please try again!')
        console.error('Error submitting feedback:', error)
      }

      setLoading(false)
    }
  }

  return (
    <div  className='bg-black/90' >
      <Navbar />
      
      <div className="min-h-[60vh] bg-black text-white flex flex-col justify-center items-center py-12 px-4">
        <div className="max-w-xl w-full text-center bg-gray-900/60 p-8 rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-700 to-gray-100 mb-6">We Value Your Feedback</h2>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your feedback here..."
            className="w-full h-40 p-4 rounded-lg bg-gray-900/60 text-white border-2 border-gray-600 focus:outline-none focus:border-blue-500 resize-none mb-6"
          />

          {success && <p className="mb-4 text-green-500">{success}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center justify-center px-8 py-3 ${loading ? 'bg-gray-500' : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'} text-white rounded-full shadow-lg hover:shadow-lg hover:from-black hover:to-gray-800 transition duration-300 transform hover:scale-105`}
          >
            <span className="mr-2">{loading ? 'Submitting...' : 'Submit'}</span>
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>

      <AllFeedbacks    feedbackCount={feedbackCount} />

      <Footer />
    </div>
  )
}

export default FeedBack
