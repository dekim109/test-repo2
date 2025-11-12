
import React, { useState } from 'react';
import { MemeTemplate } from '../types';
import { fileToBase64, urlToBase64 } from '../utils/fileUtils';
import Loader from './Loader';

interface ImageSelectorProps {
  onImageSelect: (base64: string) => void;
  templates: MemeTemplate[];
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect, templates }) => {
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setError(null);
        const base64 = await fileToBase64(file);
        onImageSelect(base64);
      } catch (e) {
        setError("Failed to load image file. Please try another one.");
        console.error(e);
      }
    }
  };

  const handleTemplateClick = async (template: MemeTemplate) => {
    setLoadingTemplate(template.id);
    setError(null);
    try {
      const base64 = await urlToBase64(template.url);
      onImageSelect(base64);
    } catch (e) {
      setError(`Failed to load template: ${template.name}.`);
      console.error(e);
    } finally {
      setLoadingTemplate(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Get Started</h2>
        <p className="text-gray-400">Upload your own image or choose a popular template.</p>
      </div>

      {error && <p className="text-center text-red-400 mb-4">{error}</p>}

      <div className="flex justify-center mb-8">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Upload an Image
        </label>
        <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-all duration-300"
            onClick={() => handleTemplateClick(template)}
          >
            <img src={template.url} alt={template.name} className="w-full h-full object-cover aspect-square" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {loadingTemplate === template.id ? (
                <Loader message="" />
              ) : (
                <p className="text-white text-center font-semibold px-2">{template.name}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
