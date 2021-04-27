import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Provider } from "../src/context/Dashboard.reducer";
function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
