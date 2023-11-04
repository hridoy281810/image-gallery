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
import { IoCheckbox, IoImage } from 'react-icons/io5';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './ImageGallery.css'
const ItemType = 'IMAGE';

const DraggableImage = ({ image, id, index, isSelected, onImageSelect, onImageDrop }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onImageDrop(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const imageClass = `image ${index === 0 ? 'image-large-0' : `image-large-${index}`}`;

  return (
    <div
      ref={(node) => {
        ref(drop(node));
      }}
      className={`relative cursor-pointer border-2 border-gray-400 rounded-lg overflow-hidden hover:border-none ${
        index === 0 ? 'col-span-2 md:row-span-2 lg:row-span-2' : ''
      }`}
    >
      <div className={`image-container`}>
        <img
          src={image}
          alt={`Image ${id}`}
          className={imageClass}
        />
        <div className="image-overlay" onClick={() => onImageSelect(id)}>
          <input
            type="checkbox"
            className="checkbox-primary"
            checked={isSelected}
          />
        </div>
      </div>
    </div>
  );
};

const Gell = () => {
  const initialImages = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
    { id: 4, image: image4 },
    { id: 5, image: image5 },
    { id: 6, image: image6 },
    { id: 7, image: image7 },
    { id: 8, image: image8 },
    { id: 9, image: image9 },
    { id: 10, image: image10 },
    { id: 11, image: image11 },
  ];

  const [images, setImages] = useState(initialImages);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelect = (id) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(id)) {
        return prevSelectedImages.filter((item) => item !== id);
      } else {
        return [...prevSelectedImages, id];
      }
    });
  };

  const handleImageDrop = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [draggedItem] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, draggedItem);
    setImages(newImages);
  };

  useEffect(() => {
    // Save selected images and image order to local storage whenever they change
    localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
    localStorage.setItem('imageOrder', JSON.stringify(images));
  }, [selectedImages, images]);

  useEffect(() => {
    // Load selected images and image order from local storage on component mount
    const selectedImagesFromLocalStorage = localStorage.getItem('selectedImages');
    const imageOrderFromLocalStorage = localStorage.getItem('imageOrder');

    if (selectedImagesFromLocalStorage) {
      setSelectedImages(JSON.parse(selectedImagesFromLocalStorage));
    }

    if (imageOrderFromLocalStorage) {
      setImages(JSON.parse(imageOrderFromLocalStorage));
    }
  }, []);

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
                onClick={() => {
                  setSelectedImages([]);
                  localStorage.removeItem('selectedImages');
                }}
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
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        
            {images.map(({ image, id }, index) => (
              <DraggableImage
                key={id}
                id={id}
                image={image}
                index={index}
                isSelected={selectedImages.includes(id)}
                onImageSelect={handleImageSelect}
                onImageDrop={handleImageDrop}
              />
            ))}
            <div className="image-container add-image-container">
              <IoImage size={30} />
              <p className="text-xl mt-4">Add Images</p>
            </div>
          </div>
        </DndProvider>
      </div>
    </div>
  );
};

export default Gell;
