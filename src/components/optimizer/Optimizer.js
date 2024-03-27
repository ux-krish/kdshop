import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import Layout from '../common/Layout';

function Optimizer() {
  const [images, setImages] = useState([]);
  const [settings, setSettings] = useState({
    maxWidth: 1920,
    quality: 0.75,
  });

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const imagePromises = files.map(async (file) => {
      const originalImageSrc = URL.createObjectURL(file);
      try {
        const options = {
          maxSizeMB: 1,
          maxWidth: settings.maxWidth,
          useWebWorker: true,
          initialQuality: settings.quality,
        };

        const compressedFile = await imageCompression(file, options);
        const compressedImageSrc = URL.createObjectURL(compressedFile);

        return {
          original: originalImageSrc,
          compressed: compressedImageSrc,
        };
      } catch (error) {
        console.error('Error compressing image:', error);
        return null;
      }
    });

    const compressedImages = await Promise.all(imagePromises);
    setImages(compressedImages.filter((image) => image !== null));
  };

  const handleDownload = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'compressed_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Image Optimizer</h2>
      
      <div className="my-4">
        <label className="block mb-2">Max Width:</label>
        <input
          type="number"
          value={settings.maxWidth}
          onChange={(e) => setSettings({ ...settings, maxWidth: parseInt(e.target.value, 10) })}
          className="input input-bordered w-full max-w-xs outline-none px-2 py-1 rounded-md bg-slate-900 focus:outline-1 outline-offset-2"
        />
      </div>
      <div className="my-4">
        <label className="block mb-2">Quality (0 to 1):</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={settings.quality}
          onChange={(e) => setSettings({ ...settings, quality: parseFloat(e.target.value) })}
          className="range range-primary"
        />
        <div className="text-left">Image Quality: {settings.quality}</div>
      </div>
      <label className="block mb-6">
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
      </label>
      <div className="flex flex-wrap gap-5 my-5">
        {images.map((image, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 flex flex-col items-center mb-4">
            <img src={image.original} alt="Original" className="outline outline-1 outline-offset-2 outline-teal-500  max-w-xs w-full mb-5" />
            <img src={image.compressed} alt="Compressed" className="outline outline-1 outline-offset-2 outline-purple-500 mb-2 max-w-xs w-full" />
            <button className="bg-gradient-to-br from-purple-400 to-teal-800 hover:from-emerald-500 hover:to-fuchsia-500 drop-shadow hover:drop-shadow-none h-10 px-5 py-1 rounded-md hover:bg-purple-800 text-slate-100 mt-2" onClick={() => handleDownload(image.compressed)}>Download</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Optimizer;
