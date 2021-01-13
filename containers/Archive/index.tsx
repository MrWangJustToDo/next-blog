import ArchiveHead from "./archiveHead";
import ArchiveContent from "./archiveContent";
import Loading from "components/LoadRender/loading";
import { useArchive, useAutoLoadArchive } from "hook/useArchive";

let Index = () => {
  const { value, canLoad, loadMore } = useArchive();
  useAutoLoadArchive({ canLoad, loadMore, breakPoint: 600 });
  return (
    <>
      <ArchiveHead />
      <div className="card mx-4 border-0">
        {Object.keys(value).map((year) => (
          <ArchiveContent key={year} year={year} blogProps={value[year]} />
        ))}
        {canLoad && <Loading />}
      </div>
    </>
  );
};

export default Index;
