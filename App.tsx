
import React, { useState } from 'react';
import { MEME_TEMPLATES } from './constants';
import * as geminiService from './services/geminiService';

import Header from './components/Header';
import ImageSelector from './components/ImageSelector';
import MemeEditor from './components/MemeEditor';
import CaptionSuggestions from './components/CaptionSuggestions';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [captions, setCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string>('');
  
  const [isLoadingCaptions, setIsLoadingCaptions] = useState<boolean>(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);
  
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (base64: string) => {
    setSelectedImage(base64);
    setEditedImage(null);
    setCaptions([]);
    setSelectedCaption('');
    setError(null);
  };

  const handleGenerateCaptions = async () => {
    if (!selectedImage) return;
    setIsLoadingCaptions(true);
    setError(null);
    setCaptions([]);

    try {
      const generatedCaptions = await geminiService.generateCaptions(editedImage || selectedImage);
      setCaptions(generatedCaptions);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoadingCaptions(false);
    }
  };

  const handleEditImage = async () => {
    if (!selectedImage || !editPrompt) return;
    setIsLoadingEdit(true);
    setError(null);

    try {
      const newImage = await geminiService.editImage(editedImage || selectedImage, editPrompt);
      setEditedImage(newImage);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoadingEdit(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setEditedImage(null);
    setCaptions([]);
    setSelectedCaption('');
    setEditPrompt('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 md:p-8">
      <div className="container mx-auto">
        <Header />
        <main className="mt-8">
          {!selectedImage ? (
            <ImageSelector onImageSelect={handleImageSelect} templates={MEME_TEMPLATES} />
          ) : (
            <div>
              <div className="text-center mb-6">
                <button
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Choose Different Image
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <MemeEditor imageSrc={editedImage || selectedImage} caption={selectedCaption} />
                </div>

                <div className="space-y-8 bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                  {error && <div className="p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">{error}</div>}

                  {/* Caption Generation */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                        <span className="text-indigo-400">1.</span> Get Captions
                    </h3>
                    <button
                      onClick={handleGenerateCaptions}
                      disabled={isLoadingCaptions}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                      ✨ Magic Caption
                    </button>
                    <CaptionSuggestions 
                        captions={captions}
                        isLoading={isLoadingCaptions}
                        onCaptionSelect={setSelectedCaption}
                    />
                  </div>
                  
                  {/* Image Editing */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                        <span className="text-indigo-400">2.</span> Edit Image
                    </h3>
                    <p className="text-sm text-gray-400">Describe a change, e.g., "add a retro filter" or "make it black and white".</p>
                    <textarea
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="Type your edit prompt here..."
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                      rows={3}
                      disabled={isLoadingEdit}
                    />
                    <button
                      onClick={handleEditImage}
                      disabled={isLoadingEdit || !editPrompt}
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      {isLoadingEdit ? <Loader message="Applying edit..." /> : 'Apply Edit'}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
