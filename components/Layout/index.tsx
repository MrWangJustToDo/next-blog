import dynamic from "next/dynamic";
import Head from "components/Head";
import Header from "components/Header";
import LoadingBar from "components/LoadingBar";
import ModuleManager from "components/ModuleManager";
import { getClass, animateFadein } from "utils/class";

const Footer = dynamic(() => import("../Footer"));

const Layout = ({ title, children }: { title?: string; children?: object }): JSX.Element => {
  return (
    <>
      <LoadingBar />
      <Head title={title} />
      <div className={getClass("d-flex flex-column", animateFadein)} style={{ minWidth: "320px" }}>
        <div style={{ minHeight: "calc(100vh - 100px)" }}>
          <Header />
          <ModuleManager children={children} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
