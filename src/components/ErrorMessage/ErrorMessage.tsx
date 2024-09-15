import css from "./ErrorMessage.module.css";

interface ErrorMessageProps{
  title: string;
  message:string;
  suggestion:string;
}

const ErrorMessage = ({ title, message, suggestion }:ErrorMessageProps) => {
  return (
    <div className={css.container}>
      <div className={css.title}>{title}</div>
      <div className={css.message}>{message}</div>
      <div className={css.suggestion}>{suggestion}</div>
    </div>
  );
};

export default ErrorMessage;
