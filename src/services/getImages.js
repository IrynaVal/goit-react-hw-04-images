import axios from 'axios';

export async function getImages(queryText, page, imgPerPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '32979410-6576ce951400b06dd5e7c6a2c';

  const response = await axios.get(
    `${BASE_URL}?q=${queryText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${imgPerPage}`
  );
  // console.log(response.data);
  return response.data;
}
