import styled from 'styled-components';

import Post from './Post';

interface Props {
    posts: { id: number; title: string; updatedAt: string }[];
}

const PostList = ({ posts }: Props) => (
    <Container>
        {posts.map((item, idx) => (
            <Post id={item.id} title={item.title} updatedAt={item.updatedAt} key={idx} />
        ))}
    </Container>
);

const Container = styled.div``;

export default PostList;
