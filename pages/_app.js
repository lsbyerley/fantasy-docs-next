import { Provider } from "../context/index";

import "normalize.css";
import "../styles/globals.scss";
import "../styles/tailwind.css";

function YahooFantasyDocs({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default YahooFantasyDocs;
