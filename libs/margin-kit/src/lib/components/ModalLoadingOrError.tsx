import classNames from "classnames";
import Spinner from "./Spinner";

interface ModalLoadingOrErrorProps {
  error?: string;
  className?: string;
}
const ModalLoadingOrError = (props: ModalLoadingOrErrorProps) => {
  const { error, className } = props;

  return (
    <div className={classNames("modal-loading-or-error", className)}>
      {error ? <span>{error}</span> : <Spinner className="modal-loading-or-error-spinner" />}
    </div>
  );
};

export default ModalLoadingOrError;
