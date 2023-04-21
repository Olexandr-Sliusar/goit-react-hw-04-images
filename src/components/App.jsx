import { GlobalStyle } from './GlobalStyle';
import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = text => {
    if (text === searchQuery) {
      toast.error('Error! Repeated request. Please use another query.');
      return;
    }
    setSearchQuery(text);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery searchQuery={searchQuery} />
      <GlobalStyle />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{ duration: 2500 }}
      />
    </>
  );
};
