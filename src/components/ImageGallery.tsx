import React, { useState } from 'react';
import { ImageLightbox } from './ImageLightbox';

interface ImageGalleryProps {
  images: string[];
  placeholder?: React.ReactNode;
  className?: string;
}

export function ImageGallery({ images, placeholder, className = '' }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  if (images.length === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        {placeholder ?? (
          <span className="text-slate-500 font-medium z-10">Sin imágenes disponibles</span>
        )}
      </div>
    );
  }

  // Determinar layout según cantidad de imágenes
  let gridClass = 'grid-cols-1';
  if (images.length === 2) gridClass = 'grid-cols-2';
  else if (images.length === 3) gridClass = 'grid-cols-3';
  else if (images.length >= 4) gridClass = 'grid-cols-2 grid-rows-2';

  return (
    <>
      <div className={`grid ${gridClass} gap-1 w-full h-full ${className}`}>
        {images.slice(0, 4).map((src, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => openLightbox(idx)}
            className="relative w-full h-full p-0 border-0 bg-transparent cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            aria-label={`Abrir imagen ${idx + 1} en visor`}
          >
            <img
              src={src}
              alt={`Imagen ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                // Si falla la carga, ocultar la imagen para no mostrar icono roto
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </button>
        ))}
      </div>

      <ImageLightbox
        key={`lightbox-${selectedIndex}`}
        images={images}
        initialIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </>
  );
}
