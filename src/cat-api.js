import axios from 'axios';
const api_key =
  'live_vkNtmZ1cQWwjQ6PiUVYPeOdlaz9apqiTpT5ThAPyHg65feotuYqLfAC5ra6lJtYy';

axios.defaults.headers.common['x-api-key'] = api_key;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('/breeds').then(({ data }) => data);
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(({ data }) => data);
}
