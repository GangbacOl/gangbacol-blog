import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import { END } from 'redux-saga';

import { wrapper } from '../../store/configStore';
import { AsyncActionEnum } from '../../interfaces/reducer/action.interface';
import { Post as PostType, PostStoreType } from '../../interfaces/reducer/state.interface';

interface StoreType {
    post: PostStoreType;
}

const Post = () => {
    const post: PostType | null = useSelector((state: StoreType) => state.post.singlePost);
    return <Container>{post ? <Markdown>{post.content}</Markdown> : null}</Container>;
};

const Container = styled.div`
    width: 50%;
    padding: 40px 25%;
    overflow: hidden;
    & img {
        margin: 0 auto;
        width: 90%;
        padding: 0 5%;
    }
    @media only screen and (max-width: 1024px) {
        width: 80%;
        padding: 40px 10%;
    }
    @media only screen and (max-width: 450px) {
        width: calc(100% - 60px);
        padding: 40px 30px;
    }
`;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ query, store }) => {
    store.dispatch({
        type: AsyncActionEnum.LOAD_SINGLE_POST_REQUEST,
        payload: query.id,
    });
    store.dispatch(END);
    await (store as any).sagaTask.toPromise();
});

export default Post;
