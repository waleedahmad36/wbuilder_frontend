import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaRegComments } from 'react-icons/fa'
import { rootUrl } from '../constants'

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    // Fetch all feedbacks from the backend
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${rootUrl}/api/v1/feedback`) 
        setFeedbacks(response.data)
        console.log(response.data)
      } catch (err) {
        setError('Failed to load feedbacks.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  // Function to fetch gender-specific avatar
  const getAvatarUrl = (gender) => {
    if (gender === 'female') {
      return 'https://avatar.iran.liara.run/public/girl' // Female Avatar
    } else if (gender === 'male') {
      return 'https://avatar.iran.liara.run/public/boy' // Male Avatar
    } else {
      return 'https://avatar.iran.liara.run/public' // Default Avatar
    }
  }

  return (
    <div className="  text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-6 text-center">
          All Feedbacks
        </h2>

        {loading ? (
          <div className="flex justify-center items-center w-full min-h-[50vh]">
            <div class="flex flex-row gap-2">
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
</div>
            </div>
        ) : error ? (
          <div className="text-center text-xl text-red-500">{error}</div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-gray-800 p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl w-[80%] sm:w-fit max-w-[360px] mx-auto md:mx-0"
              >
                <div className="flex items-center mb-4">
                  {/* User Avatar */}
                  <img 
                    src={getAvatarUrl(feedback.user.gender)} 
                    alt={feedback.user.username} 
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <h3 className="text-xl font-semibold">{feedback.user.username}</h3>
                </div>
                <p className="text-gray-300">
                    {truncateText(feedback.message, 150)}
                    </p>
                <div className="text-sm text-gray-500 mt-4">
                  <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllFeedbacks
