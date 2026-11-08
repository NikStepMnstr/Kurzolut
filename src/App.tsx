import styled from 'styled-components';

import { useCnbRates } from './api/cnb.ts';
import { Dashboard } from './components/Dashboard.tsx';
import { ErrorMessage } from './components/ErrorMessage.tsx';
import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';
import { Loader } from './components/Loader.tsx';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.main`
  flex: 1;
  display: grid;
  width: 100%;
  align-content: start;
  grid-template-areas:
    'header'
    'sidebar'
    'notice'
    'grid';
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.l};
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin-inline: auto;
  padding: ${({ theme }) => theme.space.l};

  @media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
    grid-template-areas:
      'header notice'
      'sidebar grid';
    grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    column-gap: ${({ theme }) => theme.space.xxl};
    padding: ${({ theme }) => `${theme.space.l} ${theme.space.xxl}`};
  }
`;

export const App = () => {
  const { data, isFetched, isFetching, refetch } = useCnbRates();

  if (isFetching && !isFetched) {
    return <Loader />;
  }

  return (
    <Layout>
      <Container>
        <Header />
        {data ? (
          <Dashboard data={data} />
        ) : (
          <ErrorMessage isRetrying={isFetching} onRetry={refetch} />
        )}
      </Container>
      <Footer />
    </Layout>
  );
};
