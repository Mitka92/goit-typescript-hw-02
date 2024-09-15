import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ title, message, suggestion }) => {
  return (
    <div className={css.container}>
      <div className={css.title}>{title}</div>
      <div className={css.message}>{message}</div>
      <div className={css.suggestion}>{suggestion}</div>
    </div>
  );
};

export default ErrorMessage;
