import css from "./ImageCard.module.css";
const ImageCard = ({ alt, src, regularSrc, openModal }) => {
  return (
    <div className={css.thumb}>
      <img src={src} alt={alt} onClick={() => openModal(regularSrc, alt)} />
    </div>
  );
};

export default ImageCard;
