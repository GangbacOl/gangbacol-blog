import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
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
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
