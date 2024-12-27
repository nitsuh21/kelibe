'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/services/api/profile';
import { Category } from '@/app/profile/data';

interface CategoryFormProps {
  category: Category;
  questions: Question[];
  initialAnswers?: Record<number, string>;
  onSave: (answers: { questionId: number; answer: string }[]) => Promise<void>;
}

export default function CategoryForm({ category, questions, initialAnswers = {}, onSave }: CategoryFormProps) {
  const [answers, setAnswers] = useState<Record<number, string>>(initialAnswers);
  const [isEditing, setIsEditing] = useState<Record<number, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer
      }));
      await onSave(formattedAnswers);
      // Reset all editing states
      setIsEditing({});
    } catch (error) {
      console.error('Failed to save answers:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderQuestion = (question: Question) => {
    const isEditingThis = isEditing[question.id];
    const currentAnswer = answers[question.id] || '';

    switch (question.question_type) {
      case 'single_choice':
        return (
          <select
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            disabled={!isEditingThis}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'scale':
        const min = question.min_value || 1;
        const max = question.max_value || 5;
        const values = Array.from({ length: max - min + 1 }, (_, i) => i + min);
        
        return (
          <div className="mt-2 flex items-center space-x-2">
            {values.map((value) => (
              <button
                key={value}
                onClick={() => isEditingThis && handleAnswerChange(question.id, value.toString())}
                disabled={!isEditingThis}
                className={`w-10 h-10 rounded-full ${
                  currentAnswer === value.toString()
                    ? `bg-${category.color} text-white`
                    : 'bg-gray-100 text-gray-600'
                } ${isEditingThis ? 'hover:bg-gray-200' : ''}`}
              >
                {value}
              </button>
            ))}
          </div>
        );

      case 'boolean':
        return (
          <div className="mt-2 flex items-center space-x-4">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                onClick={() => isEditingThis && handleAnswerChange(question.id, option.toLowerCase())}
                disabled={!isEditingThis}
                className={`px-4 py-2 rounded-md ${
                  currentAnswer === option.toLowerCase()
                    ? `bg-${category.color} text-white`
                    : 'bg-gray-100 text-gray-600'
                } ${isEditingThis ? 'hover:bg-gray-200' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      default: // short_answer
        return (
          <textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            disabled={!isEditingThis}
            placeholder={isEditingThis ? "Share your thoughts..." : ""}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
            <button
              onClick={() => setIsEditing(prev => ({
                ...prev,
                [question.id]: !prev[question.id]
              }))}
              className={`ml-4 inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                isEditing[question.id]
                  ? 'border-indigo-500 text-indigo-500 hover:bg-indigo-50'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {isEditing[question.id] ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {renderQuestion(question)}
        </motion.div>
      ))}

      {Object.values(isEditing).some(Boolean) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-4 flex justify-end bg-white p-4 rounded-xl shadow-lg"
        >
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
