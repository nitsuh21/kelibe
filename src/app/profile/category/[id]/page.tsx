'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Sidebar from '@/components/Side-bar';
import profileService, { Category, Question, UserResponse } from '@/services/api/profile';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

type ResponseValue = string | boolean | number | string[] | null;

interface ResponseFormProps {
  question: Question;
  initialValue: ResponseValue;
  onChange: (value: ResponseValue) => void;
  hideEditButton?: boolean;
}

const ResponseForm: React.FC<ResponseFormProps> = ({ 
  question, 
  initialValue, 
  onChange,
  hideEditButton = false
}) => {
  const [isEditing, setIsEditing] = useState(true);

  const renderInput = () => {
    switch (question.question_type) {
      case 'short_answer':
        return (
          <input
            type="text"
            value={String(initialValue || '')}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Type your answer..."
          />
        );
      case 'single_choice':
        const choiceValue = String(initialValue || '');
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={choiceValue === option}
                  onChange={(e) => onChange(e.target.value)}
                  className="text-pink-600 focus:ring-pink-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'multiple_choice':
        const selectedOptions = Array.isArray(initialValue) ? initialValue : 
                              initialValue ? [String(initialValue)] : [];
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    const newValue = [...selectedOptions];
                    if (e.target.checked) {
                      newValue.push(option);
                    } else {
                      const index = newValue.indexOf(option);
                      if (index !== -1) newValue.splice(index, 1);
                    }
                    onChange(newValue);
                  }}
                  className="text-pink-600 focus:ring-pink-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'boolean':
        const boolValue = String(initialValue).toLowerCase() === 'true';
        return (
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${question.id}`}
                value="true"
                checked={boolValue}
                onChange={() => onChange('true')}
                className="text-pink-600 focus:ring-pink-500"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${question.id}`}
                value="false"
                checked={!boolValue}
                onChange={() => onChange('false')}
                className="text-pink-600 focus:ring-pink-500"
              />
              <span>No</span>
            </label>
          </div>
        );
      case 'scale':
        const scaleValue = initialValue ? parseInt(String(initialValue), 10) : (question.min_value || 0);
        return (
          <div>
            <input
              type="range"
              min={question.min_value || 0}
              max={question.max_value || 10}
              value={scaleValue}
              onChange={(e) => onChange(e.target.value)}
              className="w-full"
            />
            <div className="text-center mt-2">
              Current value: {scaleValue}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <p className="font-medium text-gray-900">{question.text}</p>
        {question.required && (
          <span className="text-sm text-red-500">*Required</span>
        )}
      </div>
      {renderInput()}
    </div>
  );
};

function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [category, setCategory] = useState<Category | null>(null);
  const [responses, setResponses] = useState<Record<number, ResponseValue>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchCategoryAndResponses = async () => {
    try {
      if (!params.id) return;
      
      const categoryId = Array.isArray(params.id) ? params.id[0] : params.id;
      
      // Get category details which includes user_responses
      const categoryData = await profileService.getCategoryDetail(categoryId);
      setCategory(categoryData);

      // Set responses directly from user_responses
      if (categoryData.user_responses) {
        const responseMap: Record<number, ResponseValue> = {};
        Object.entries(categoryData.user_responses).forEach(([questionId, userResponse]) => {
          if (typeof userResponse === 'string') {
            responseMap[parseInt(questionId, 10)] = userResponse;
          } else {
            responseMap[parseInt(questionId, 10)] = userResponse.response;
          }
        });
        setResponses(responseMap);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      toast.error('Failed to load category details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryAndResponses();
  }, [params.id]);

  const handleResponseChange = (questionId: number, value: ResponseValue) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSave = async () => {
    if (!category) return;

    setSaving(true);
    try {
      // Format responses for bulk update
      const formattedResponses = Object.entries(responses)
        .filter(([_, value]) => value !== null && value !== undefined) // Only include non-empty responses
        .map(([questionId, response]) => ({
          question: parseInt(questionId, 10),
          response: response
        }));

      if (formattedResponses.length === 0) {
        toast.error('Please answer at least one question');
        setSaving(false);
        return;
      }

      const requestData = {
        category_id: category.id,
        responses: formattedResponses
      };

      console.log('Sending request data:', requestData);

      const updatedCategory = await profileService.bulkUpdateResponses(requestData);
      setCategory(updatedCategory);

      // Update responses from the new category data
      if (updatedCategory.user_responses) {
        const responseMap: Record<number, ResponseValue> = {};
        Object.entries(updatedCategory.user_responses).forEach(([questionId, response]) => {
          responseMap[parseInt(questionId, 10)] = response.response;
        });
        setResponses(responseMap);
      }

      toast.success('Responses saved successfully');
      router.push('/profile');
    } catch (error) {
      console.error('Error saving responses:', error);
      toast.error('Failed to save responses');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Category not found</h2>
          <Link 
            href="/profile"
            className="mt-4 inline-flex items-center text-pink-600 hover:text-pink-700"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 md:p-8 md:pl-72">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <Link 
              href="/profile"
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{category.title}</h1>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
            {category.questions.map((question) => (
              <ResponseForm
                key={question.id}
                question={question}
                initialValue={responses[question.id]}
                onChange={(value) => handleResponseChange(question.id, value)}
              />
            ))}

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Responses'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryPage;
