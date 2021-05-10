import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
    id: number;
    title: string;
    updatedAt: string;
}

const Post = ({ id, title, updatedAt }: Props) => {
    const parseDate = () => {
        const newDate = new Date(updatedAt);
        const year = newDate.getFullYear(),
            month = newDate.getMonth() + 1,
            day = newDate.getDate() + 1;
        return year + '년 ' + month + '월 ' + day + '일';
    };

    return (
        <Container>
            <TitleWrap>
                <Link href={`/post/${id}`}>
                    <Title>{title}</Title>
                </Link>
            </TitleWrap>
            <DateWrap>
                <DateItem>{parseDate()}</DateItem>
            </DateWrap>
        </Container>
    );
};

const Container = styled.div``;
const TitleWrap = styled.div``;
const Title = styled.h2``;
const DateWrap = styled.div``;
const DateItem = styled.p``;

export default memo(Post);
