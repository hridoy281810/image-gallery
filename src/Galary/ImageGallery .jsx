
import React, { useState, useEffect } from 'react';
import './ImageGallery.css'; // You can create a CSS file for styling
import image1 from '../assets/images/image-1.webp';
import image2 from '../assets/images/image-2.webp';
import image3 from '../assets/images/image-3.webp';
import image4 from '../assets/images/image-4.webp';
import image5 from '../assets/images/image-5.webp';
import image6 from '../assets/images/image-6.webp';
import image7 from '../assets/images/image-7.webp';
import image8 from '../assets/images/image-8.webp';
import image9 from '../assets/images/image-9.webp';
import image10 from '../assets/images/image-10.jpeg';
import image11 from '../assets/images/image-11.jpeg';
import { IoCheckbox, IoImage } from "react-icons/io5";

const ImageGallery = () => {
  const initialImages = [
    { id: 1, image: image1, scale: 1},
    { id: 2, image: image2, scale: 1},
    { id: 3, image: image3, scale: 1 },
    { id: 4, image: image4, scale: 1 },
    { id: 5, image: image5, scale: 1 },
    { id: 6, image: image6, scale: 1 },
    { id: 7, image: image7, scale: 1 },
    { id: 8, image: image8, scale: 1 },
    { id: 9, image: image9, scale: 1 },
    { id: 10, image: image10, scale: 1 },
    { id: 11, image: image11, scale: 1 },
  ];

  const [images, setImages] = useState(initialImages);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
    setDraggedIndex(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    if (draggedIndex !== null) {
      const newImages = [...images];
      const draggedImage = newImages[draggedIndex];
      newImages.splice(draggedIndex, 1); // Remove the dragged item
      newImages.splice(index, 0, draggedImage); // Insert it at the new position
      setImages(newImages);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleImageSelection = (id) => {
    if (!selectedImages.includes(id)) {
      setSelectedImages([...selectedImages, id]);
    } else {
      setSelectedImages(selectedImages.filter((item) => item !== id));
    }
  };

  const handleDeleteSelectedImages = () => {
    const newImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(newImages);
    setSelectedImages([]);
  };
  return (
    <div className="bg-gray-300 w-full p-4">
      <div className="bg-white rounded-tr-lg rounded-tl-lg px-6 py-4 border-b border-gray-400">
        <div className="flex justify-between text-xl font-semibold">
          {selectedImages.length > 0 ? (
            <>
              <div className="inline-flex justify-center items-center gap-2">
                <span className="text-blue-600">
                  <IoCheckbox />
                </span>
                <p>{selectedImages.length} Files Selected</p>
              </div>
              <p
                onClick={handleDeleteSelectedImages}
                className="text-red-600 cursor-pointer"
              >
                Delete
              </p>
            </>
          ) : (
            <p>Gallery</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-br-lg rounded-bl-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map(({ image, id }, index) => (
            <div
              key={id}
              className={`relative cursor-pointer border-2 border-gray-400 rounded-lg overflow-hidden hover:border-none   ${
                index === 0 ? 'col-span-2 md:row-span-2 lg:row-span-2' : 'col-span-1'
              }`}
              onDragOver={(event) => handleDragOver(event, index)}
              onDragStart={(event) => handleDragStart(event, index)}
              onDragEnd={handleDragEnd}
              draggable
            >
              {/* Change the image size based on the drag state */}
              <img
                src={image}
                alt={`Image $\b{index + 1}`}
                className={`w-full h-auto transition-transform duration-300 ${
                  index === draggedIndex ? 'transform scale-110' : ''
                }`}
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-700 opacity-0 hover:opacity-50 flex items-center justify-center rounded-lg border-2 border-gray-500">
                <input
                  type="checkbox"
                  className={`checkbox-primary mr-1 absolute top-4 left-4 z-10`}
                  onClick={() => handleImageSelection(id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;