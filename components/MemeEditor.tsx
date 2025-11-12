
import React, { useRef, useCallback } from 'react';

interface MemeEditorProps {
  imageSrc: string;
  caption: string;
}

const MemeEditor: React.FC<MemeEditorProps> = ({ imageSrc, caption }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleDownload = useCallback(() => {
    const image = imageRef.current;
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      // Meme text style
      const fontSize = Math.max(24, Math.min(img.width / 10, 48));
      ctx.font = `bold ${fontSize}px 'Impact', 'Arial Black', sans-serif`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 15;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      
      const x = canvas.width / 2;
      const y = canvas.height - 20;

      // Wrap text
      const words = caption.split(' ');
      let line = '';
      const lines = [];
      for(let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > canvas.width * 0.9 && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      
      lines.reverse().forEach((line, index) => {
        const lineY = y - (index * (fontSize + 10));
        ctx.strokeText(line.trim(), x, lineY);
        ctx.fillText(line.trim(), x, lineY);
      });

      const link = document.createElement('a');
      link.download = 'my-meme.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.onerror = (e) => {
      console.error("Error loading image for canvas download", e);
      alert("Could not download image. It might be due to cross-origin restrictions on template images.");
    }

  }, [imageSrc, caption]);


  return (
    <div className="w-full max-w-2xl mx-auto">
      <div id="meme-canvas" className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
        <img ref={imageRef} src={imageSrc} alt="Meme in progress" className="w-full h-auto max-h-[70vh] object-contain" />
        {caption && (
          <div 
            className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] pointer-events-none"
            style={{
              textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 2px 0 0 #000, -2px 0 0 #000',
            }}
          >
            <p className="text-center text-white font-extrabold uppercase text-2xl md:text-4xl"
              style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
            >
              {caption}
            </p>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Meme
        </button>
      </div>
    </div>
  );
};

export default MemeEditor;
