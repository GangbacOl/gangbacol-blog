import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { login } from '../../utils/api';
import { convertErrorToMsg } from '../../utils/errorBoundary';

const LoginPage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const res = await login(data);
            console.log(res);
            if (res.status === 200) {
                await localStorage.setItem('token', res.data.token);
                router.push('/');
            }
        } catch (error) {
            console.log(error.response.data.errorCode);
            alert(convertErrorToMsg(error.response.data.errorCode));
        }
    };

    useLayoutEffect(() => {
        if (localStorage.getItem('token')) router.push('/');
    }, []);

    return (
        <Container>
            <HookForm onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="아이디를 입력해주세요." {...register('account', { required: true })} />
                <br />
                <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    {...register('password', { required: true })}
                />
                <Input type="submit" />
            </HookForm>
            <Link href="/admin/register">계정 등록하러 가기</Link>
            <Link href="/">메인으로 가기</Link>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const HookForm = styled.form``;
const Input = styled.input``;

export default LoginPage;
