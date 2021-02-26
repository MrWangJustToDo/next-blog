import useSWR from "swr";
import Loading from "components/Loading";
import { autoRequest } from "utils/fetcher";
import { autoTransformData } from "utils/data";
import loadingError from "./loadingError";
import { LoadRenderType } from "./@type";

let LoadRender: LoadRenderType;

LoadRender = ({
  method,
  path,
  query,
  requestData,
  token,
  loaded,
  loading = Loading,
  loadError = loadingError,
  fetcher,
  placeholder = {},
  initialData,
  revalidateOnMount = true,
}) => {
  const currentFetcher = fetcher ? fetcher : autoRequest({ method, data: requestData, token, query }).run;
  const { data, error }: { data?: any; error?: any } = useSWR(path, currentFetcher, { initialData, revalidateOnMount });
  if (error) return loadError(error.toString());
  if (data) return loaded(autoTransformData(data));
  return loading({ _style: placeholder });
};

export default LoadRender;
