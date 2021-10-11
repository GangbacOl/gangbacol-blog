import styled from "styled-components";

import Post from "./Post";

interface Props {
  posts: { id: number; description: string; title: string; updatedAt: string }[];
  isAdmin: boolean;
}

const PostList = ({ posts, isAdmin }: Props) => {
  return (
    <Container>
      {posts.map((post, idx) => (
        <Post
          id={post.id}
          key={idx}
          title={post.title}
          description={post.description}
          updatedAt={post.updatedAt}
          isAdmin={isAdmin}
        />
      ))}
    </Container>
  );
};

const Container = styled.div``;

export default PostList;
