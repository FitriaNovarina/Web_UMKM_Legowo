
import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'avatar' | 'image';
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'card', className = '' }) => {
  switch (type) {
    case 'card':
      return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden animate-pulse ${className}`}>
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      );
    
    case 'text':
      return (
        <div className={`animate-pulse ${className}`}>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      );
    
    case 'avatar':
      return (
        <div className={`w-12 h-12 bg-gray-200 rounded-full animate-pulse ${className}`}></div>
      );
    
    case 'image':
      return (
        <div className={`bg-gray-200 animate-pulse ${className}`}></div>
      );
    
    default:
      return (
        <div className={`h-20 bg-gray-200 rounded animate-pulse ${className}`}></div>
      );
  }
};

export default LoadingSkeleton;
