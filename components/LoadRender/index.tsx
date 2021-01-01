import useSWR from "swr";
import { autoTransformData } from "utils/data";
import { transformObjectUrl } from "utils/path";
import { fetcherRequest } from "utils/fetcher";
import Loading from "./loading";
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
  const currentFetcher = fetcher ? fetcher : fetcherRequest({ method, data: requestData });
  const relativeUrl = transformObjectUrl({ path, query });
  const { data, error }: { data?: any; error?: any } = useSWR([relativeUrl, token], currentFetcher, { initialData, revalidateOnMount });
  if (error) return loadError(error.toString());
  if (data) return loaded(autoTransformData(data));
  return loading({ placeholder });
};

export default LoadRender;
