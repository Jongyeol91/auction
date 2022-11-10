import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { colors } from '@/lib/colors';
import ErrorBoundary from '@/components/ErrorBoundary';
import 'antd/dist/antd.css';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import GlobalStyle from '@/styles/GlobalStyle';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import { setDefaultAxiosAuth } from '@/lib/defaultAxios';
import GlobalDialog from '@/components/base/GlobalDialog';

// if (process.env.NODE_ENV === 'development') {
//   require('mocks');
// }

function MyApp({ Component, pageProps }: AppProps) {
  const [, setUser] = useAtom(userAtom);

  const handleGetProfile = async () => {
    const token = await localStorage.getItem('accessToken');
    if (token) {
      await setDefaultAxiosAuth(token);
    }
    console.log('token', token);
  };
  useEffect(() => {
    handleGetProfile();
  }, []);

  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={colors}>
        <GlobalStyle />
        <ErrorBoundary>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <GlobalDialog />
          </Hydrate>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
