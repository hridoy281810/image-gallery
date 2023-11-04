import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

const Sortable = ({image,handleImageSelection,index}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: image.id })


    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }


    // const handle_selected_Image = id => {
    //     const exist = selectedImages?.includes(id);

    //     if (exist) {
    //         const unSelect = selectedImages?.filter(item => item !== id);
    //         setSelectedImages(unSelect)
    //     }
    //     else {
    //         setSelectedImages([...selectedImages, id]);
    //     }
    //     // console.log(exist)
    // }
    return (
      
            <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
          
            className={`relative cursor-pointer border-2 border-gray-400 rounded-lg  overflow-hidden hover:border-none  ${
                index === 0 ? 'col-span-2 md:row-span-2 lg:row-span-2' : ''
              }`}
          
            >
              <img
                src={image.image}
                alt={`Image ${index + 1}`}
                className={`w-full h-auto transition-transform ease-in-out 
                    transform hover:scale-110  duration-300 opacity-100
                `}
              />
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-700 opacity-0 hover:opacity-50 flex items-center justify-center rounded-lg border-2 border-gray-500" >
                <input
                  type="checkbox"
                  className={`checkbox-primary mr-1 absolute top-4 left-4 z-10`}
                  onClick={() => handleImageSelection(id)}
                />
              </div>
            </div>
     
    );
};

export default Sortable;