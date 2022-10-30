import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { colors } from '@/lib/colors';
import ErrorBoundary from '@/components/ErrorBoundary';
import 'antd/dist/antd.css';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import GlobalStyle from '@/styles/GlobalStyle';

if (process.env.NODE_ENV === 'development') {
  require('mocks');
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={colors}>
        <GlobalStyle />
        <ErrorBoundary>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
