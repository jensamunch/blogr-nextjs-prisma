import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import 'tailwindcss/tailwind.css'
import '../styles/nprogress.css'; //styles of nprogress

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
