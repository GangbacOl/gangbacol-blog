import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";
import { END } from "redux-saga";

import { wrapper } from "../../store/configStore";
import { AsyncActionEnum } from "../../interfaces/reducer/action.interface";
import { Post as PostType, RootState } from "../../interfaces/reducer/state.interface";

const Post = () => {
  const post: PostType | null = useSelector((state: RootState) => state.post.singlePost);
  return (
    <Container>
      <MarkdownWrapper>{post ? <Markdown>{post.content}</Markdown> : null}</MarkdownWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 40px auto;
  display: flex;
  justify-content: center;
`;

const MarkdownWrapper = styled.div`
  width: 50%;
  padding: 30px 30px;
  background: #f8f8f8;
  border-radius: 40px;
  box-shadow: 41px 41px 82px #bebebe, -41px -41px 82px #ffffff;
  overflow: hidden;
  & img {
    margin: 0 auto;
    width: 90%;
    padding: 0 5%;
  }
  & pre {
    width: calc(100% - 40px);
    padding: 20px;
    border-radius: 10px;
    background: #eeeeee;
    color: #3a3a3a;
    font-weight: 500;
  }
  @media only screen and (max-width: 1024px) {
    width: calc(80% - 60px);
    padding: 40px 30px;
  }
  @media only screen and (max-width: 450px) {
    width: calc(100% - 60px);
    padding: 40px 30px;
  }
`;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ query, store }) => {
  store.dispatch({
    type: AsyncActionEnum.GET_SINGLE_POST_REQUEST,
    payload: query.id,
  });
  store.dispatch(END);
  await (store as any).sagaTask.toPromise();
});

export default Post;
