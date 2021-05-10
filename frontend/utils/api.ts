import axios from 'axios';

import { GET_SINGLE_POST, GET_POSTS } from './baseUrl';

export const getSinglePost = async (id: string | string[]): Promise<{}[]> => {
    console.log(id);
    const { data } = await axios.get(`${GET_SINGLE_POST}/${id}`);
    return data;
};
export const getPosts = async (): Promise<{}[]> => {
    const { data } = await axios.get(`${GET_POSTS}`);
    return data;
};
