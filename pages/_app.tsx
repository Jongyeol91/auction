import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { colors } from '@/lib/colors';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={colors}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
