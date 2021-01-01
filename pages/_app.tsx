import React, { FC } from "react";
import { AppProps } from "next/app";
import { wrapper } from "store";
import Layout from "components/Layout";

import "../styles/globals.css";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default wrapper.withRedux(WrappedApp);
