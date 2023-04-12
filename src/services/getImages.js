const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '30799952-e63899d969c466cbb36ba87be';

export const getImages = (searchText, page, perPage) => {
  return fetch(
    `${BASE_URL}q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
};
