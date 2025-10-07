import { createContext, useContext, useState, ReactNode } from 'react';
import { ImageModal } from './image-modal';

interface ImageModalContextType {
  openModal: (src: string, alt: string) => void;
  closeModal: () => void;
}

const ImageModalContext = createContext<ImageModalContextType | null>(null);

export function useImageModal() {
  const context = useContext(ImageModalContext);
  if (!context) {
    throw new Error('useImageModal must be used within ImageModalProvider');
  }
  return context;
}

interface ImageModalProviderProps {
  children: ReactNode;
}

export function ImageModalProvider({ children }: ImageModalProviderProps) {
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null);

  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <ImageModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ImageModal 
        src={modalImage?.src || ''}
        alt={modalImage?.alt || ''}
        isOpen={!!modalImage}
        onClose={closeModal}
      />
    </ImageModalContext.Provider>
  );
}