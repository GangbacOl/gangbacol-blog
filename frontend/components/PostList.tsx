import styled from 'styled-components';

import Post from './Post';

interface Props {
    posts: { title: string; filename: string; date: string }[];
}

const PostList = ({ posts }: Props) => (
    <Container>
        {posts.map((item, idx) => (
            <Post title={item.title} filename={item.filename} date={item.date} key={idx} />
        ))}
    </Container>
);

const Container = styled.div``;

export default PostList;
