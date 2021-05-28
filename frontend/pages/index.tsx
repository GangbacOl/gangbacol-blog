import { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { END } from 'redux-saga';

import PostList from '../components/PostList';
import { SagaStore, wrapper } from '../store/configStore';
import { AsyncActionEnum } from '../interfaces/reducer/action.interface';
import { PostStoreType } from '../interfaces/reducer/state.interface';

import Empty from '../assets/empty.svg';

interface StoreType {
    post: PostStoreType;
}

const IndexPage = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const posts = useSelector((state: StoreType) => state.post.posts);

    useLayoutEffect(() => {
        const isToken = localStorage.getItem('token') ? true : false;
        setIsAdmin(isToken);
    }, []);
    return (
        <Container>
            {posts.length > 0 ? (
                <PostList posts={posts} isAdmin={isAdmin} />
            ) : (
                <EmptyContainer>
                    <EmptySvgWrap>
                        <EmptySvg />
                    </EmptySvgWrap>
                    <Description>작성된 게시물이 없습니다.</Description>
                </EmptyContainer>
            )}
        </Container>
    );
};

const Container = styled.div``;
const EmptyContainer = styled.div``;
const EmptySvgWrap = styled.div``;
const EmptySvg = styled(Empty)``;
const Description = styled.p``;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    ctx.store.dispatch({
        type: AsyncActionEnum.LOAD_POSTS_REQUEST,
    });
    ctx.store.dispatch(END);
    await (ctx.store as SagaStore).sagaTask.toPromise();
});

export default IndexPage;
