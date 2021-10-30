import axios from "../utils/axios";
import {
  UPLOAD_IMAGE_URL,
  UPLOAD_MARKDOWN_URL,
  GET_SINGLE_POST,
  GET_POSTS,
  DELETE_URL,
} from "../constants/baseUrl";

export const uploadPostImages = async (images: FileList) => {
  const formDataImage = new FormData();
  Array.from(images).forEach((image) => formDataImage.append("images", image));

  const { data } = await axios.post(UPLOAD_IMAGE_URL, formDataImage, {
    headers: { authorization: localStorage.getItem("token") },
  });

  return data;
};

export const uploadPost = async (
  title: string,
  description: string,
  content: string,
  filenames: string[]
) => {
  return await axios.post(
    UPLOAD_MARKDOWN_URL,
    { title, description, content, filenames },
    { headers: { authorization: localStorage.getItem("token") } }
  );
};

export const getSinglePost = async (id: string | string[]): Promise<{}[]> => {
  const { data } = await axios.get(`${GET_SINGLE_POST}/${id}`);
  return data;
};

export const getPosts = async (): Promise<{}[]> => {
  const { data } = await axios.get(`${GET_POSTS}`);
  return data;
};

export const deletePost = async (id: number): Promise<{}> => {
  const { data } = await axios.delete(`${DELETE_URL}/${id}`, {
    headers: { authorization: localStorage.getItem("token") },
  });
  return data;
};
