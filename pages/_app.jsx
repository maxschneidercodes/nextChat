import Layout from '../components/layout/layout';
import '../styles/globals.css';

import { ContextProvider } from "../context/context"

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
