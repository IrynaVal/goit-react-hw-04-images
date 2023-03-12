import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from 'services/getImages';

export const App = () => {
  // state = {
  //   searchQuery: '',
  //   images: [],
  //   loading: false,
  //   page: 1,
  //   imgPerPage: 12,
  // };

  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const [imgPerPage, setImgPerPage] = useState(12);
  const [imgPerPage] = useState(12);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    getImages(searchQuery, page, imgPerPage)
      .then(data => {
        // console.log(data);
        console.log(data.hits);
        if (data.totalHits === 0) {
          return Promise.reject(new Error());
        }
        setImages(prevState => [...prevState, ...data.hits]);
      })
      .catch(error => {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery, page, imgPerPage]);

  // const componentDidUpdate(prevProps, prevState) {
  //   const { searchQuery, page, imgPerPage, images } = this.state;
  //   if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
  //     setLoading(true);
  //     getImages(searchQuery, page, imgPerPage)
  //       .then(data => {
  //         // console.log(data);
  //         // console.log(data.hits);
  //         if (data.totalHits === 0) {
  //           return Promise.reject(new Error());
  //         }
  //         setImages(...images, ...data.hits);
  //       })
  //       .catch(error => {
  //         toast.error(
  //           'Sorry, there are no images matching your search query. Please try again.'
  //         );
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // }

  const formSubmitHandler = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoad = () => {
    setPage(prevState => prevState + 1);
    // page+1
  };

  // render() {
  //   const { loading, images } = this.state;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Toaster position="top-right" />
      <Searchbar onSubmit={formSubmitHandler} />
      {images.length !== 0 && <ImageGallery images={images} />}
      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      {images.length !== 0 && !loading && <Button onClick={handleLoad} />}
    </div>
  );
};
// }
