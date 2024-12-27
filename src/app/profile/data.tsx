import { 
  SparklesIcon, 
  HeartIcon, 
  UserGroupIcon,
  BookOpenIcon,
  StarIcon,
  MusicalNoteIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  CameraIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { JSX } from 'react';

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  completionStatus?: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "core-values",
    title: "Core Values",
    description: "Define your personality and beliefs",
    icon: <HeartIcon className="w-6 h-6" />,
    completionStatus: "4/5",
    color: "#6666FF"
  },
  {
    id: "growth-mindset",
    title: "Growth Mindset",
    description: "Your approach to learning and growth",
    icon: <SparklesIcon className="w-6 h-6" />,
    completionStatus: "3/5",
    color: "#FF6B6B"
  },
  {
    id: "relationships",
    title: "Relationships",
    description: "Your social connections and preferences",
    icon: <UserGroupIcon className="w-6 h-6" />,
    completionStatus: "2/5",
    color: "#4ECDC4"
  },
  {
    id: "education",
    title: "Education",
    description: "Your academic background and goals",
    icon: <BookOpenIcon className="w-6 h-6" />,
    completionStatus: "5/5",
    color: "#45B7D1"
  },
  {
    id: "achievements",
    title: "Achievements",
    description: "Your accomplishments and milestones",
    icon: <StarIcon className="w-6 h-6" />,
    completionStatus: "1/5",
    color: "#96CEB4"
  },
  {
    id: "interests",
    title: "Interests & Hobbies",
    description: "Your passions and recreational activities",
    icon: <MusicalNoteIcon className="w-6 h-6" />,
    completionStatus: "0/5",
    color: "#D4A5A5"
  },
  {
    id: "career",
    title: "Career Goals",
    description: "Your professional aspirations",
    icon: <BriefcaseIcon className="w-6 h-6" />,
    completionStatus: "0/5",
    color: "#9B5DE5"
  },
  {
    id: "travel",
    title: "Travel & Culture",
    description: "Your travel experiences and preferences",
    icon: <GlobeAltIcon className="w-6 h-6" />,
    completionStatus: "0/5",
    color: "#F15BB5"
  },
  {
    id: "creativity",
    title: "Creative Expression",
    description: "Your artistic and creative pursuits",
    icon: <CameraIcon className="w-6 h-6" />,
    completionStatus: "0/5",
    color: "#FEE440"
  },
  {
    id: "innovation",
    title: "Innovation & Tech",
    description: "Your relationship with technology",
    icon: <BeakerIcon className="w-6 h-6" />,
    completionStatus: "0/5",
    color: "#00BBF9"
  }
];