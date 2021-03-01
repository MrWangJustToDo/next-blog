import useSWR from "swr";
import Loading from "components/Loading";
import loadingError from "./loadingError";
import WithUpdateStore from "./withUpdateStore";
import { autoRequest } from "utils/fetcher";
import { useCurrentState } from "hook/useBase";
import { autoTransformData } from "utils/data";
import { GetCurrentInitialDataType, LoadRenderType } from "./@type";

let LoadRender: LoadRenderType;

let getCurrentInitialData: GetCurrentInitialDataType;

LoadRender = ({
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
  loadError = loadingError,
  revalidateOnMount = true,
}) => {
  if (!path && !apiPath) return null;
  const currentPath = apiPath ? apiPath : path;
  const currentFetcher = fetcher ? fetcher : autoRequest({ method, data: requestData, token, query }).run;
  const { initialData: currentInitialData, dispatch } = getCurrentInitialData({ initialData, apiPath });
  const { data, error }: { data?: any; error?: any } = useSWR(currentPath, currentFetcher, { initialData: currentInitialData, revalidateOnMount });
  if (error) return loadError(error.toString());
  if (data) {
    const currentData = autoTransformData(data);
    return (
      <WithUpdateStore needUpdate={needUpdate} currentState={currentInitialData} apiPath={apiPath} data={currentData} dispatch={dispatch}>
        {loaded(currentData)}
      </WithUpdateStore>
    );
  }
  return loading({ _style: placeholder });
};

getCurrentInitialData = ({ initialData, apiPath }) => {
  const { state, dispatch } = useCurrentState();
  if (initialData) return { initialData, dispatch };
  if (apiPath) return { initialData: state.server[apiPath]["data"], dispatch };
  return { dispatch };
};

export default LoadRender;
