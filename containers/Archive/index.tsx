import ArchiveHead from "./archiveHead";
import ArchiveContent from "./archiveContent";
import Loading from "components/LoadRender/loading";
import { useArchive, useAutoLoadArchive } from "hook/useArchive";
import { SimpleElement } from "containers/Main/@type";

let Archive: SimpleElement;

Archive = () => {
  const { value, canLoad, loadMore } = useArchive();
  useAutoLoadArchive({ canLoad, loadMore, breakPoint: 600 });
  return (
    <>
      <ArchiveHead />
      <div className="card mx-lg-4 border-0">
        {Object.keys(value).map((year) => (
          <ArchiveContent key={year} year={year} blogProps={value[year]} />
        ))}
        {canLoad && <Loading />}
      </div>
    </>
  );
};

export default Archive;
