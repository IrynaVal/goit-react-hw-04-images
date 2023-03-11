import { Component } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from 'services/getImages';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    loading: false,
    page: 1,
    imgPerPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, imgPerPage, images } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });
      getImages(searchQuery, page, imgPerPage)
        .then(data => {
          // console.log(data);
          // console.log(data.hits);
          if (data.totalHits === 0) {
            return Promise.reject(new Error());
          }
          this.setState({ images: [...images, ...data.hits] });
        })
        .catch(error => {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  formSubmitHandler = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  handleLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading, images } = this.state;
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
        <Searchbar onSubmit={this.formSubmitHandler} />
        {this.state.images.length !== 0 && <ImageGallery images={images} />}
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
        {images.length !== 0 && !loading && (
          <Button onClick={this.handleLoad} />
        )}
      </div>
    );
  }
}
