import { useState, useEffect } from 'react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true)
  }, []);

  if (!showChild) {
    return null;
  }

  return <Component {...pageProps} />
}

export default MyApp
