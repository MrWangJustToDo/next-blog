import { useDispatch, useSelector } from "react-redux";
import { UseCurrentStateType } from "./@type";

let useCurrentState: UseCurrentStateType;

useCurrentState = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  return { state, dispatch };
};

export { useCurrentState };
