import { LoadingErrorType } from "./@type";

let LoadingError: LoadingErrorType;

LoadingError = (error) => (
  <div className="text-truncate text-danger p-2" title={error}>
    loading failed: {error}
  </div>
);

export default LoadingError;
