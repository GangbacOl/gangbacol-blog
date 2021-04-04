import { AppProps } from 'next/app';

import GlobalStyle from '../style/globalStyle';
import wrapper from '../store/configStore';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
};

export default wrapper.withRedux(App);
