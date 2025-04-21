import React from 'react';

const CarCard = ({ car }) => {
  const {
    heading,
    price,
    miles,
    inventory_type,
    exterior_color,
    interior_color,
    media,
  } = car;

  const fallbackImage = media?.photo_links_cached?.[0] || ''; // fallback to second image
  const imageUrl = media?.photo_links?.[0] || fallbackImage;

  return (
    <div className='movie-card'>
    <img
      src={imageUrl}
      alt={heading}
      onError={(e) => {
        if (e.target.src !== fallbackImage && fallbackImage) {
          e.target.src = fallbackImage;
        }
      }}
      className="w-full h-48 object-cover rounded-md mb-2"
    />
      <h3 className='text-white text-lg font-semibold mb-1'>{heading}</h3>
      <p className='text-gray-300'>Price: ${price}</p>
      <p className='text-gray-300'>Miles: {miles}</p>
      <p className='text-gray-300'>Type: {inventory_type}</p>
      <p className='text-gray-300'>Exterior: {exterior_color}</p>
      <p className='text-gray-300'>Interior: {interior_color}</p>
    </div>
  );
};

export default CarCard;
