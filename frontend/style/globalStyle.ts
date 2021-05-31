import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
    html, * { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }
    body {
        background: #f0eff5;
        margin: 0;
    }
    @media only screen and (min-width: 1024px) {
        html { font-size: 16px; }
    }
    @media only screen and (max-width: 1024px) {
        html { font-size: 14px; }
    }
    @media only screen and (max-width: 450px) {
        html { font-size: 12px; }
    }
`;
