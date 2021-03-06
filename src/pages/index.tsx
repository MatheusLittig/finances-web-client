import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { HomeView } from '@/views';

const HomePage: NextPage = () => <HomeView />;

export default HomePage;

export const getServerSideProps: GetServerSideProps = async req => {
  const session = await getSession(req);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
