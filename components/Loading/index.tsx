import style from "./index.module.scss";

let Loading;

Loading = () => {
  return (
    <div className={style["sk-chase"]}>
      <div className={style["sk-chase-dot"]} />
      <div className={style["sk-chase-dot"]} />
      <div className={style["sk-chase-dot"]} />
      <div className={style["sk-chase-dot"]} />
      <div className={style["sk-chase-dot"]} />
      <div className={style["sk-chase-dot"]} />
    </div>
  );
};

export default Loading;
