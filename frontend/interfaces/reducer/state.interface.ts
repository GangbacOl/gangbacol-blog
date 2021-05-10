export type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

export interface PostStoreType {
    singlePost: Post | null;
    posts: Post[];
    loading: boolean;
    error: {} | null;
}
