import axios from "axios";

const API_KEY = "mbpxi9B4ycQIekqztiUMKO1XdeKGkV5diviFv8fNfPo";
const per_page = 15;
axios.defaults.baseURL = "https://api.unsplash.com/";

const getPhotos = async (query, page) => {
  const params = {
    per_page,
    query,
    orientation: "landscape",
    page,
    client_id: API_KEY,
  };
  const data = await axios.get(`search/photos/`, { params });
  return data;
};
export default getPhotos;
