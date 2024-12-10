'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Side-bar'
import Rsidebar from '@/components/Rside-bar'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon,
  PencilIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

const categoryData = {
  'core-values': {
    name: "Core Values and Identity",
    description: "Your personality, beliefs, and values that define who you are",
    image: "/Images/core-values.webp",
    questions: [
      {
        id: 1,
        question: "What are your core beliefs that guide your daily decisions?",
        placeholder: "Share your fundamental principles and how they influence your choices...",
        answer: ""
      },
      {
        id: 2,
        question: "How do you maintain authenticity in your relationships?",
        placeholder: "Describe your approach to being genuine with others...",
        answer: "I believe in open communication and showing vulnerability when appropriate. Being authentic means acknowledging both strengths and weaknesses."
      },
      {
        id: 3,
        question: "What values would you never compromise on?",
        placeholder: "Explain the principles you hold most dear...",
        answer: "Honesty, integrity, and respect for others are non-negotiable. I believe these form the foundation of any meaningful relationship."
      },
      {
        id: 4,
        question: "How do your cultural background and experiences shape your worldview?",
        placeholder: "Reflect on how your background influences your perspective...",
        answer: ""
      },
      {
        id: 5,
        question: "What legacy would you like to leave behind?",
        placeholder: "Share your thoughts on the impact you want to make...",
        answer: "I want to contribute to positive change in technology and society, ensuring that innovations benefit everyone."
      }
    ]
  },
  'growth-mindset': {
    name: "Growth Mindset",
    description: "Your ability to learn, adapt, and thrive in changing environments",
    image: "/Images/mindset.webp",
    questions: [
      {
        id: 1,
        question: "How do you approach learning from failures?",
        placeholder: "Describe your process of growing from setbacks...",
        answer: ""
      },
      {
        id: 2,
        question: "What's your strategy for personal development?",
        placeholder: "Share your approach to continuous improvement...",
        answer: "I set quarterly goals, seek feedback actively, and dedicate time each week for learning new skills."
      },
      {
        id: 3,
        question: "How do you adapt to unexpected changes?",
        placeholder: "Explain your approach to handling uncertainty...",
        answer: ""
      },
      {
        id: 4,
        question: "What role does feedback play in your growth?",
        placeholder: "Describe how you use feedback for improvement...",
        answer: "I actively seek feedback from mentors and peers, viewing it as valuable data for growth."
      },
      {
        id: 5,
        question: "How do you challenge your comfort zone?",
        placeholder: "Share examples of pushing your boundaries...",
        answer: ""
      }
    ]
  },
  'aspirations': {
    name: "Achieving Goals",
    description: "The determination and effort you put into reaching your milestones",
    image: "/Images/aspirations.png",
    questions: [
      {
        id: 1,
        question: "What are your long-term aspirations?",
        placeholder: "Share your vision for the future...",
        answer: "I aim to create innovative solutions that make technology more accessible and beneficial for society."
      },
      {
        id: 2,
        question: "How do you break down big goals into achievable steps?",
        placeholder: "Describe your goal-setting process...",
        answer: "I use the SMART framework and create monthly milestones to track progress."
      },
      {
        id: 3,
        question: "What motivates you to pursue your goals?",
        placeholder: "Share what drives you forward...",
        answer: "The potential to make a positive impact and continuous learning keeps me motivated."
      },
      {
        id: 4,
        question: "How do you handle setbacks in pursuing your goals?",
        placeholder: "Explain your approach to overcoming obstacles...",
        answer: "I view setbacks as learning opportunities and adjust my approach based on lessons learned."
      },
      {
        id: 5,
        question: "What role do others play in your goal achievement?",
        placeholder: "Describe how relationships influence your journey...",
        answer: "I believe in the power of mentorship and collaborative growth."
      }
    ]
  }
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = categoryData[params.id as keyof typeof categoryData]
  const [editingId, setEditingId] = useState<number | null>(null)
  const [answers, setAnswers] = useState(category.questions.map(q => q.answer))
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = () => {
    // Here you would typically save all changes to the backend
    setHasChanges(false)
    setEditingId(null)
  }

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
    setHasChanges(true)
  }

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 lg:ml-64 lg:mr-64">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{category.name}</h1>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </div>
          </div>

          {/* Questions */}
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6 bg-white rounded-2xl p-6 shadow-sm">
            {category.questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium pr-8">{question.question}</h3>
                  {editingId !== question.id && (
                    <button
                      type="button"
                      onClick={() => setEditingId(question.id)}
                      className="p-2 text-gray-400 hover:text-[#6666FF] rounded-xl transition-colors"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {editingId === question.id ? (
                  <div className="space-y-4">
                    <textarea
                      className="w-full p-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6666FF] min-h-[120px] text-gray-700"
                      placeholder={question.placeholder}
                      value={answers[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                      autoFocus
                    />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-sm text-gray-500">
                        {answers[index]?.length || 0} characters
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="text-[#6666FF] hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[60px] text-gray-600 whitespace-pre-wrap">
                    {answers[index] || (
                      <span className="text-gray-400 italic">Click the pencil icon to add your thoughts...</span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Update Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end pt-6 border-t border-gray-100"
            >
              <button
                type="submit"
                disabled={!hasChanges}
                className={`px-8 py-3 rounded-xl flex items-center gap-2 font-medium ${
                  hasChanges 
                    ? 'bg-[#6666FF] text-white hover:bg-[#5555ee]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                } transition-colors`}
              >
                <CheckIcon className="w-5 h-5" />
                Update Answers
              </button>
            </motion.div>
          </form>
        </div>
      </main>
      <Rsidebar />
    </div>
  )
}
