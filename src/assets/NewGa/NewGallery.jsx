import React, { useState, useEffect } from 'react';
// import './ImageGallery.css'; // You can create a CSS file for styling
import image1 from '../../assets/images/image-1.webp';
import image2 from '../../assets/images/image-2.webp';
import image3 from '../../assets/images/image-3.webp';
import image4 from '../../assets/images/image-4.webp';
import image5 from '../../assets/images/image-5.webp';
import image6 from '../../assets/images/image-6.webp';
import image7 from '../../assets/images/image-7.webp';
import image8 from '../../assets/images/image-8.webp';
import image9 from '../../assets/images/image-9.webp';
import image10 from '../../assets/images/image-10.jpeg';
import image11 from '../../assets/images/image-11.jpeg';
import { IoCheckbox, IoImage } from "react-icons/io5";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';
import Sortable from './Sortable';

const NewGallery = () => {
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



  const onDragEnd = event => {
    if (event.over && event.active.id !== event.over.id) {
        const oldIndex = images.findIndex((item) => item.id === event.active.id);
        const newIndex = images.findIndex((item) => item.id === event.over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newImageGallery = arrayMove(images, oldIndex, newIndex);
          setImages(newImageGallery);
        }
      }
}

//  .............. 
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
              <div className='inline-flex justify-center items-center gap-2 '>
                <span className='text-blue-600 '><IoCheckbox /></span>
                <p>{selectedImages.length} Files Selected</p>
              </div>
              <p onClick={handleDeleteSelectedImages} className='text-red-600 cursor-pointer'>Delete</p>
            </>
          ) : (
            <p>Gallery</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-br-lg rounded-bl-lg p-4">
        <div  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" >
        <DndContext 
        
        collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={images} strategy={rectSwappingStrategy}>
          {images.map(( image, index) => 
            <Sortable   key={index} image={image} handleImageSelection={handleImageSelection} index={index} />
          )}
          </SortableContext >
          </DndContext>
          <div className=' flex flex-col justify-center items-center cursor-pointer border-2  border-dashed   border-gray-400 rounded-lg text-gray-500 ' >
              <IoImage size={30} />
              <p className='text-xl mt-4'>
                Add Images
              </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NewGallery;
