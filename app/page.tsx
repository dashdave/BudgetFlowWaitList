"use client"
import Image from "next/image"
import { CalendarIcon } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
  })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState(0)
  

useEffect(() => {
  // Fetch subscriber count when component mounts
  async function fetchSubscriberCount() {
    try {
      const response = await axios.get("/api/waitlist")
      if (!response.data.errored && response.data.subscribers) {
        setSubscriberCount(response.data.subscribers)
      }
    } catch (error) {
      console.error("Error fetching subscriber count:", error)
      // Keep the default count if there's an error
    }
  }
  
  fetchSubscriberCount()
}, [success]) // Refetch when success changes (i.e., after successful submission)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await axios.post("/api/waitlist", formData)
      setSuccess(true)
      setFormData({ email: "" }) // Optional: clear the form
    } catch (error) {
      console.error("Something went wrong:", error)
      // You can add error state here if needed
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white bg-[linear-gradient(to_right,rgba(220,220,220,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,220,220,0.3)_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="w-full max-w-2xl px-4 py-12 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-medium text-indigo-600 border border-gray-100 shadow-sm mb-6">
          <CalendarIcon className="h-4 w-4 text-indigo-600" />
          <span>Coming Soon</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
        Tell the AI About You. Get a Stunning Portfolio — Instantly.
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        No more drag-and-drop. No coding. Just write a simple prompt, and our AI will generate a professional portfolio using curated templates, tailored to your style, your work, and your goals.
        Perfect for designers, devs, and freelancers who want to stand out without wasting time.
        </p>
        
        <div className="space-y-4 mb-8">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-indigo-600 focus:outline-none text-gray-800 placeholder-gray-500"
            disabled={loading}
          />
          <button
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join the Waitlist — It's Free"}
          </button>
        </div>
        
        {success && (
          <div className="text-green-600 font-medium mb-6">
            ✅ You've successfully joined the waitlist!
          </div>
        )}
        
        <div className="flex items-center justify-center mb-12">          
          <span className="text-sm text-gray-600">
            {subscriberCount > 0 ? `${subscriberCount} users joined already` : "Join our waitlist today!"}
          </span>
        </div>
      </div>
    </div>
  )
}