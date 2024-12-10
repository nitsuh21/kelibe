import React from 'react';
import Image from 'next/image';
import { FiHeart, FiMessageSquare } from 'react-icons/fi';

interface ProfileCardProps {
  name: string;
  age: number;
  location: string;
  interests: string[];
  imageUrl: string;
  distance: string;
}

const ProfileCard = ({ name, age, location, interests, imageUrl, distance }: ProfileCardProps) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Profile Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${name}'s profile`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-xl font-semibold">{name}, {age}</h3>
            <p className="text-sm opacity-90">{distance} away</p>
            <p className="text-sm opacity-90">{location}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
              <FiMessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-pink-500 hover:bg-opacity-70 transition-colors">
              <FiHeart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mt-2">
          {interests.slice(0, 3).map((interest, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
