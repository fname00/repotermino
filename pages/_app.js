// _app.js
import { appWithTranslation } from 'next-i18next';
import '../i18n'; // import i18n configuration

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
