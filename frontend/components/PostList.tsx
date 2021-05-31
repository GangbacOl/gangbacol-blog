import styled from 'styled-components';

import Post from './Post';
import { deletePost } from '../utils/api';

import Delete from '../assets/delete.svg';

interface Props {
    posts: { id: number; description: string; title: string; updatedAt: string }[];
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
            {posts.map((post, idx) => (
                <PostWrap key={idx}>
                    <Post
                        id={post.id}
                        title={post.title}
                        description={post.description}
                        updatedAt={post.updatedAt}
                    />
                    {isAdmin && (
                        <ButtonSvgWrap>
                            <DeleteSvg onClick={() => handleDelete(post.id)} />
                        </ButtonSvgWrap>
                    )}
                </PostWrap>
            ))}
        </Container>
    );
};

const Container = styled.div``;
const PostWrap = styled.div`
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    border-radius: 20px;
    padding: 0 20px;
    background: #f8f8f8;
    box-shadow: 14px 14px 28px #bcbcbc, -14px -14px 28px #ffffff;
    transition: all 0.3s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 19px 19px 38px #bcbcbc, -19px -19px 38px #ffffff;
    }
    @media only screen and (max-width: 1024px) {
        width: calc(100% - 34px);
        border-radius: 15px;
        padding: 0 17px;
    }
    @media only screen and (max-width: 450px) {
        position: relative;
        width: calc(100% - 20px);
        margin: 15px 0;
        border-radius: 10px;
        padding: 0 10px;
    }
`;
const ButtonSvgWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const DeleteSvg = styled(Delete)`
    width: 25px;
    height: auto;
    margin: 0 10px;
    transition: all 0.3s;
    &:hover {
        transform: scale(1.15);
    }
    @media only screen and (max-width: 1024px) {
        width: 20px;
        margin: 0 7px;
    }
    @media only screen and (max-width: 450px) {
        position: absolute;
        top: 12px;
        right: 2px;
        width: 17px;
    }
`;

export default PostList;
