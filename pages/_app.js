import Layout from '../components/Layout'
import { CartProvider } from '../components/Cart'
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
    return (
      <ToastProvider autoDismiss={true} autoDismissTimeout="2500">
        <CartProvider>
          <Layout>
            <Component {...pageProps} />  
          </Layout>
        </CartProvider>  
      </ToastProvider>
  )
}

export default MyApp
