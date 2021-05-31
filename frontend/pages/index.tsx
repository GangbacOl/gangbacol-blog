import { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { END } from 'redux-saga';

import PostList from '../components/PostList';
import { SagaStore, wrapper } from '../store/configStore';
import { AsyncActionEnum } from '../interfaces/reducer/action.interface';
import { PostStoreType } from '../interfaces/reducer/state.interface';

import Empty from '../public/assets/empty.svg';

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

const Container = styled.div`
    padding: 40px 20%;
    @media only screen and (max-width: 1024px) {
        padding: 20px;
    }
    @media only screen and (max-width: 450px) {
        padding: 10px 20px;
    }
`;
const EmptyContainer = styled.div`
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const EmptySvgWrap = styled.div`
    width: 100px;
    height: auto;
    @media only screen and (max-width: 1024px) {
        width: 90px;
    }
    @media only screen and (max-width: 450px) {
        width: 70px;
    }
`;
const EmptySvg = styled(Empty)``;
const Description = styled.p`
    font-size: 1.3rem;
    letter-spacing: 1.3x;
`;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    ctx.store.dispatch({
        type: AsyncActionEnum.LOAD_POSTS_REQUEST,
    });
    ctx.store.dispatch(END);
    await (ctx.store as SagaStore).sagaTask.toPromise();
});

export default IndexPage;
