import React, { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
    id: number;
    title: string;
    description: string;
    updatedAt: string;
}

const Post = ({ id, title, description, updatedAt }: Props) => {
    const parseDate = () => {
        const newDate = new Date(updatedAt);
        const year = newDate.getFullYear(),
            month = newDate.getMonth() + 1,
            day = newDate.getDate();
        return year + '년 ' + month + '월 ' + day + '일';
    };

    return (
        <Container>
            <TitleWrap>
                <Link href={`/post/${id}`}>
                    <Title>{title}</Title>
                </Link>
            </TitleWrap>
            <DescWrap>
                <Desc>{description}</Desc>
            </DescWrap>
            <DateWrap>
                <DateItem>{parseDate()}</DateItem>
            </DateWrap>
        </Container>
    );
};

const Container = styled.div``;
const TitleWrap = styled.div`
    &:hover {
        cursor: pointer;
    }
`;
const Title = styled.h2``;
const DescWrap = styled.div``;
const Desc = styled.p``;
const DateWrap = styled.div``;
const DateItem = styled.p``;

export default memo(Post);
