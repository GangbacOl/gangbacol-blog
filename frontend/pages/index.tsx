import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { END } from 'redux-saga';

import wrapper from '../store/configStore';
import PostList from '../components/PostList';
import { AsyncActionEnum } from '../interfaces/reducer/action.interface';
import { PostStoreType } from '../interfaces/reducer/state.interface';

interface StoreType {
    post: PostStoreType;
}

const IndexPage = () => {
    const posts = useSelector((state: StoreType) => state.post.posts);
    console.log(posts);
    return (
        <Container>
            <PostList posts={posts} />
        </Container>
    );
};

const Container = styled.div``;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
    store.dispatch({
        type: AsyncActionEnum.LOAD_POSTS_REQUEST,
    });
    store.dispatch(END);
    await (store as any).sagaTask.toPromise();
});

export default IndexPage;
