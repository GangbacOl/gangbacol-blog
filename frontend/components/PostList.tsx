import styled from 'styled-components';

import Post from './Post';
import { deletePost } from '../utils/api';

interface Props {
    posts: { id: number; title: string; updatedAt: string }[];
    isAdmin: boolean;
}

const PostList = ({ posts, isAdmin }: Props) => {
    const handleDelete = async (id: number) => {
        const res = await deletePost(id);

        if (res.status === 200) {
            document.location.reload();
        }
    };
    return (
        <Container>
            {posts.map((item, idx) => (
                <PostWrap key={idx}>
                    <Post id={item.id} title={item.title} updatedAt={item.updatedAt} />
                    {isAdmin && <DeleteButton onClick={() => handleDelete(item.id)}>삭제</DeleteButton>}
                </PostWrap>
            ))}
        </Container>
    );
};

const Container = styled.div``;
const PostWrap = styled.div``;
const DeleteButton = styled.button``;

export default PostList;
