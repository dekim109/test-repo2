
import React from 'react';
import Loader from './Loader';

interface CaptionSuggestionsProps {
  captions: string[];
  onCaptionSelect: (caption: string) => void;
  isLoading: boolean;
}

const CaptionSuggestions: React.FC<CaptionSuggestionsProps> = ({ captions, onCaptionSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader message="Brewing up witty captions..." />
      </div>
    );
  }

  if (captions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-200">Suggested Captions:</h3>
        {captions.map((caption, index) => (
            <button
            key={index}
            onClick={() => onCaptionSelect(caption)}
            className="w-full text-left p-3 bg-gray-700 hover:bg-indigo-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
            "{caption}"
            </button>
        ))}
    </div>
  );
};

export default CaptionSuggestions;
