import { useEffect } from "react";
import useSWR from "swr";
import isEqual from "lodash/isEqual";
import Loading from "components/Loading";
import loadingError from "./loadingError";
import { autoRequest } from "utils/fetcher";
import { autoTransformData } from "utils/data";
import { useCurrentState } from "hook/useBase";
import { getDataSucess_Server } from "store/reducer/server/action";
import { AutoUpdateStateType, GetCurrentInitialDataType, LoadRenderProps, LoadRenderType } from "./@type";

let LoadRender: LoadRenderType;

let getCurrentInitialData: GetCurrentInitialDataType;

let autoUpdateState: AutoUpdateStateType;

LoadRender = <T extends {}>({
  method,
  path,
  apiPath,
  query,
  token,
  fetcher,
  requestData,
  initialData,
  loaded,
  placeholder,
  loading = Loading,
  needUpdate = false,
  needinitialData = false,
  loadError = loadingError,
  revalidateOnMount = true,
}: LoadRenderProps<T>) => {
  if (!path && !apiPath) return null;
  const currentPath = apiPath ? apiPath : path;
  const currentFetcher = fetcher ? fetcher : autoRequest({ method, data: requestData, token, query }).run;
  const { initialData: currentInitialData, dispatch } = getCurrentInitialData({ initialData, apiPath, needinitialData });
  const { data, error }: { data?: any; error?: any } = useSWR([currentPath, query], currentFetcher, { initialData: currentInitialData, revalidateOnMount });
  const currentData = data ? autoTransformData(data) : null;
  autoUpdateState<T>({ needUpdate, initialData: currentInitialData, apiPath, currentData, dispatch });
  if (error) return loadError(error.toString());
  if (currentData) return loaded(currentData);
  return loading({ _style: placeholder });
};

getCurrentInitialData = ({ initialData, apiPath, needinitialData }) => {
  const { state, dispatch } = useCurrentState();
  if (initialData) return { initialData, dispatch };
  if (apiPath && needinitialData) return { initialData: state.server[apiPath]["data"], dispatch };
  return { dispatch };
};

autoUpdateState = ({ needUpdate, initialData, apiPath, currentData, dispatch }) => {
  useEffect(() => {
    if (needUpdate && apiPath && !isEqual(initialData, currentData)) {
      dispatch(getDataSucess_Server(apiPath, currentData));
    }
  }, [needUpdate, apiPath, initialData, currentData]);
};

export default LoadRender;
