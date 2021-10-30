import axios from "axios";

import { BASEURL } from "../constants/baseUrl";

const instance = axios.create({
  baseURL: BASEURL,
});

/* 
      만료되었다면 로그인 페이지로 리다이렉트, 그게 아니라면 요청 수행
      1. jwt verify를 통해 만료여부 확인
        장: 매번 요청이 없어 속도와 서버 트래픽을 고려함에 있어 훌륭한 방식
        단: jwt 암호키를 알아야 함
      2. verifyToken api를 통해 만료여부 확인
        장: api 서버에 verifyToken api를 둠으로써 로직의 분리가 확실함.
        단: 매 요청마다 서버와 통신을 해야함
    */

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
