import { AppProps } from 'next/app';
import Head from 'next/head';

import GlobalStyle from '../style/globalStyle';
import { wrapper } from '../store/configStore';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>GangbacOl Blog</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="GangbacOl Blog" />
                <meta
                    property="og:description"
                    content="배움과 경험을 글로 정리하는 GangbacOl의 블로그입니다."
                />
                <meta property="og:image" content="/assets/og-background.jpg" />
                <link rel="shortcut icon" href="/favicons/favicon.png" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
};

export default wrapper.withRedux(App);
