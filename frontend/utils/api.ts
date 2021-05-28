import axios from 'axios';

import {
    UPLOAD_IMAGE_URL,
    UPLOAD_MARKDOWN_URL,
    GET_SINGLE_POST,
    GET_POSTS,
    LOGIN_URL,
    REGISTER_URL,
    DELETE_URL,
} from './baseUrl';

export const uploadPostImages = async (images: FileList) => {
    const formDataImage = new FormData();
    Array.from(images).forEach((image) => formDataImage.append('images', image));

    const { data } = await axios.post(UPLOAD_IMAGE_URL, formDataImage, {
        headers: { authorization: localStorage.getItem('token') },
    });

    return data;
};

export const uploadPost = async (title: string, content: string, filenames: string[]) => {
    return await axios.post(
        UPLOAD_MARKDOWN_URL,
        { title, content, filenames },
        { headers: { authorization: localStorage.getItem('token') } }
    );
};

export const getSinglePost = async (id: string | string[]): Promise<{}[]> => {
    const { data } = await axios.get(`${GET_SINGLE_POST}/${id}`);
    return data;
};

export const getPosts = async (): Promise<{}[]> => {
    const { data } = await axios.get(`${GET_POSTS}`);
    console.log(data);
    return data;
};

export const deletePost = async (id: number) => {
    const res = await axios.delete(`${DELETE_URL}/${id}`, {
        headers: { authorization: localStorage.getItem('token') },
    });
    return res;
};

export const login = async (data: { account: string; password: string }) => {
    const response = await axios.post(`${LOGIN_URL}`, data, {
        withCredentials: true,
    });
    return response;
};

export const register = async (data: { username: string; account: string; password: string }) => {
    const response = await axios.post(`${REGISTER_URL}`, data);
    return response;
};
