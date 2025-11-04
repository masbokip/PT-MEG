import DefaultLayout from "../../admin-app/Components/DefaultLayout";
import { SessionProvider } from 'next-auth/react';
import '../../admin-app/styles/globals.css';
import { useRouter } from 'next/router';

 function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
     <SessionProvider session={pageProps.session}>
     {router.pathname === '/' ? (
        <Component {...pageProps} />
      ) : (
          <DefaultLayout>
              <Component {...pageProps} />
          </DefaultLayout>
      )}
     </SessionProvider>
     </>
   
  );
}
export default App;
