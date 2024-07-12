// src/components/CarouselComponent.tsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos CSS

const CarouselComponent: React.FC = () => {
  const items = [
    {
      name: 'Producto 1',
      description: 'Descripción del Producto 1',
      image: 'https://via.placeholder.com/800x400?text=Slide+1',
    },
    {
      name: 'Producto 2',
      description: 'Descripción del Producto 2',
      image: 'https://via.placeholder.com/800x400?text=Slide+2',
    },
    {
      name: 'Producto 3',
      description: 'Descripción del Producto 3',
      image: 'https://via.placeholder.com/800x400?text=Slide+3',
    },
  ];

  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false}
      interval={5000}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
              position: 'absolute',
              zIndex: 2,
              top: 0,
              left: 0,
              width: '50px',
              height: '100%',
              cursor: 'pointer',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.5,
            }}
          >
            ❮
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
              position: 'absolute',
              zIndex: 2,
              top: 0,
              right: 0,
              width: '50px',
              height: '100%',
              cursor: 'pointer',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.5,
            }}
          >
            ❯
          </button>
        )
      }
    >
      {items.map((item, index) => (
        <Link href="#" key={index} underline="none">
          <div>
            <img src={item.image} alt={item.name} />
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
