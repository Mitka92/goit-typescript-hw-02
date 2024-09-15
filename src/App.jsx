import { useEffect, useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import getPhotos from "./services/api";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import NotFound from "./components/NotFound/NotFound";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    title: "",
    message: "",
    suggestion: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");


  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { data } = await getPhotos(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setShowBtn(data.total_pages && data.total_pages !== page);
        if (!data.results.length) {
          return setIsEmpty(true);
        }
      } catch (error) {
        setErrorDetails({
          title: "Oops! Something went wrong.",
          message:
            error.message || "We couldn't fetch the images at this time.",
          suggestion:
            "Please try again later or contact support if the issue persists.",
        });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const handleSubmit = (value) => {
    setQuery(value);
    setIsEmpty(false);
    setPage(1);
    setImages([]);
    setIsError(false);
  };

  const loadMore = () => {
    setPage((page) => page + 1);
  };
  const openModal = (url, alt) => {
    setShowModal(true);
    setModalUrl(url);
    setModalAlt(alt);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalUrl("");
    setModalAlt("");
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isEmpty && <NotFound />}
      {isError && <ErrorMessage {...errorDetails} />}
      {Array.isArray(images) && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {showBtn && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal
        modalIsOpen={showModal}
        closeModal={closeModal}
        src={modalUrl}
        alt={modalAlt}
      />
    </>
  );
}

export default App;
