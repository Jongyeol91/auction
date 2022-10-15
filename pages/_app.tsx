import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { colors } from '@/lib/colors';
import ErrorBoundary from '@/components/ErrorBoundary';
import 'antd/dist/antd.css';

if (process.env.NODE_ENV === 'development') {
  require('mocks');
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={colors}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default MyApp;
