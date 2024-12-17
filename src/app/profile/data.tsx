import { 
  SparklesIcon, 
  HeartIcon, 
  UserGroupIcon,
  BookOpenIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { JSX } from 'react';

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  completionStatus?: string;
}

export const categories: Category[] = [
  {
    id: "core-values",
    title: "Core Values",
    description: "Define your personality and beliefs",
    icon: <HeartIcon className="w-6 h-6 text-[#6666FF]" />,
    completionStatus: "4/5"
  },
  {
    id: "growth-mindset",
    title: "Growth Mindset",
    description: "Your approach to learning and growth",
    icon: <SparklesIcon className="w-6 h-6 text-[#6666FF]" />,
    completionStatus: "3/5"
  },
  {
    id: "relationships",
    title: "Relationships",
    description: "Your social connections and preferences",
    icon: <UserGroupIcon className="w-6 h-6 text-[#6666FF]" />,
    completionStatus: "2/5"
  },
  {
    id: "education",
    title: "Education",
    description: "Your academic background and goals",
    icon: <BookOpenIcon className="w-6 h-6 text-[#6666FF]" />,
    completionStatus: "5/5"
  },
  {
    id: "achievements",
    title: "Achievements",
    description: "Your accomplishments and milestones",
    icon: <StarIcon className="w-6 h-6 text-[#6666FF]" />,
    completionStatus: "1/5"
  }
];