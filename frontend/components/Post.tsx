import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';

import { AWS_S3 } from '../utils/baseUrl';

interface Props {
    title: string;
    filename: string;
    date: string;
}

const Post = ({ title, filename, date }: Props) => {
    const parseDate = () => {
        const newDate = new Date(date);
        const year = newDate.getFullYear(),
            month = newDate.getMonth() + 1,
            day = newDate.getDate() + 1;
        return year + '년 ' + month + '월 ' + day + '일';
    };

    return (
        <Container>
            <TitleWrap>
                <Link href={`/post/${filename}`}>
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

export default Post;
