import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import customTheme from "../utils/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default App
