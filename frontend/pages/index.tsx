import { GetStaticProps } from 'next';
import styled from 'styled-components';
import Title from '../components/Title';
import { END } from 'redux-saga';

import wrapper from '../store/configStore';

import { AsyncActionEnum } from '../interfaces/reducer/action.interface';

type Props = {
    userData: object;
};

const IndexPage = ({ userData }: Props) => (
    <Container>
        <Title />
    </Container>
);

const Container = styled.div``;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(async (ctx) => {
    ctx.store.dispatch({
        type: AsyncActionEnum.API_LOADING,
        payload: { id: 999, content: 'awefawf' },
    });
    ctx.store.dispatch(END);
    await (ctx.store as any).sagaTask.toPromise();
    const userData = ctx.store.getState().user.data;
    return { props: { userData } };
});

export default IndexPage;
