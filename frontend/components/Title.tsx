import styled from 'styled-components';
import Image from 'next/image';

const Title = () => (
    <Container>
        <Image src="/images/img.jpeg" alt="hi" width={200} height={100} />
        <SubTitle>Hello Next.js 👋</SubTitle>
    </Container>
);

const Container = styled.div``;
const SubTitle = styled.h2``;

export default Title;
