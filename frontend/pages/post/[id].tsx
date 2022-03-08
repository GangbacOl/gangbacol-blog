import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { END } from "redux-saga";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { wrapper } from "../../store/configStore";
import { AsyncActionEnum } from "../../interfaces/reducer/action.interface";
import { Post as PostType, RootState } from "../../interfaces/reducer/state.interface";

const Post = () => {
  const post: PostType | null = useSelector((state: RootState) => state.post.singlePost);
  if (!post) return <Container>존재하지 않는 포스트입니다.</Container>;

  return (
    <Container>
      <MarkdownWrapper>
        <ReactMarkdown
          children={post.content}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </MarkdownWrapper>
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
  min-width: 800px;
  padding: 30px 50px;
  background: #f8f8f8;
  border-radius: 20px;
  box-shadow: 41px 41px 82px #bebebe, -41px -41px 82px #ffffff;
  overflow: hidden;
  & img {
    margin: 0 auto;
    width: 90%;
    padding: 0 5%;
  }
  & pre div {
    width: calc(100% - 40px);
    padding: 20px;
    border-radius: 10px;
    background: #eeeeee !important;
    font-weight: 500;
  }
  @media only screen and (max-width: 1024px) {
    //width: calc(80% - 60px);
    padding: 40px 30px;
  }
  @media only screen and (max-width: 450px) {
    //width: calc(100% - 60px);
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
