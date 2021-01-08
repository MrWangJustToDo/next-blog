import useSWR from "swr";
import { apiName } from "config/api";
import { autoTransformData } from "utils/data";
import { autoRequest } from "utils/fetcher";
import { getRelativeApiPath, transformStringUrl } from "utils/path";
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
  const relativeUrl = path.startsWith('http') ? transformStringUrl(path, query ) : getRelativeApiPath(path as apiName, query);
  const currentFetcher = fetcher ? fetcher : autoRequest({ method, data: requestData }).run;
  const { data, error }: { data?: any; error?: any } = useSWR([relativeUrl, token], currentFetcher, { initialData, revalidateOnMount });
  if (error) return loadError(error.toString());
  if (data) return loaded(autoTransformData(data));
  return loading({ placeholder });
};

export default LoadRender;
