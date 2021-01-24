import { useCallback, useState } from "react";
import { delay } from "utils/delay";
import { UseLoadType } from "./@type";

let useLoad: UseLoadType;

useLoad = ({ loading = false, height = 1.5, present = 0 }) => {
  const [state, setState] = useState({ loading, height, present });
  const start = useCallback(() => {
    setState((last) => {
      return { ...last, loading: true, present: 0, height };
    });
  }, []);
  const complate = useCallback(() => {
    setState((last) => {
      return { ...last, loading: false, present: 100 };
    });
  }, []);
  const hide = useCallback(() => {
    setState((last) => {
      return { ...last, height: 0 };
    });
  }, []);
  const end = useCallback(() => {
    delay(40, complate, "loadingBar").then(() => delay(80, hide, "loadingBar"));
  }, []);
  const autoAdd = useCallback(() => {
    let count = 8;
    return setInterval(() => {
      setState((last) => {
        if (count > 1) {
          count--;
        }
        let next = last.present + (Math.random() + count - Math.random());
        next = next < 99.5 ? next : 99.5;
        return { ...last, present: next };
      });
    }, 60);
  }, []);

  return { start, end, state, autoAdd };
};

export default useLoad;
