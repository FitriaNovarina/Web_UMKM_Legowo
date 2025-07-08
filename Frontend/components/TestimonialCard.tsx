
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  nameId: string;
  location: string;
  locationId: string;
  rating: number;
  comment: string;
  commentId: string;
  avatar?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  nameId,
  location,
  locationId,
  rating,
  comment,
  commentId,
  avatar
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-amber-800 font-semibold text-lg">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-700 italic">"{comment}"</p>
    </div>
  );
};

export default TestimonialCard;
