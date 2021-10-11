export type AsyncRequestStatus = {
  loading: boolean;
  data: object | null;
  error: object | null;
};

export type Post = {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export interface PostStoreInterface {
  singlePost: Post | null;
  multiplePost: Post[];
  getSinglePostStatus: AsyncRequestStatus;
  getMultiplePostStatus: AsyncRequestStatus;
  deletePostStatus: AsyncRequestStatus;
}

export interface RootState {
  post: PostStoreInterface;
}
