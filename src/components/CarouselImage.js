import React from 'react';

function CarouselImage({ src, alt }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', background: '#ccc' }}>
      <img
        src={src} // props로 받아온 이미지 경로
        alt={alt} // props로 받아온 alt 텍스트
        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
      />
    </div>
  );
}

export default CarouselImage;
