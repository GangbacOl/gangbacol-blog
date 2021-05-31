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
            <LoginBox>
                <HookForm onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        placeholder="아이디를 입력해주세요."
                        {...register('account', { required: true })}
                    />
                    <br />
                    <TextInput
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        {...register('password', { required: true })}
                    />
                    <ButtonInput type="submit">로그인</ButtonInput>
                </HookForm>
                <LinkWrap>
                    <Link href="/admin/register">
                        <LinkStyled>계정 등록하러 가기</LinkStyled>
                    </Link>
                    <Link href="/">
                        <LinkStyled>메인으로 가기</LinkStyled>
                    </Link>
                </LinkWrap>
            </LoginBox>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoginBox = styled.div`
    width: 400px;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    border-radius: 40px;
    background: linear-gradient(145deg, #ffffff, #d8d7dd);
    box-shadow: 40px 40px 80px #b6b6ba, -40px -40px 80px #ffffff;
    @media only screen and (max-width: 450px) {
        width: 85%;
    }
`;
const HookForm = styled.form`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const TextInput = styled.input`
    width: calc(70% - 40px);
    height: 40px;
    border: none;
    border-radius: 15px;
    padding: 0 20px;
    background: #f8f8f8;
    -webkit-box-shadow: inset 4px 4px 8px #d3d3d3, inset -4px -4px 8px #ffffff;
    box-shadow: inset 4px 4px 8px #d3d3d3, inset -4px -4px 8px #ffffff;
    outline: none;
    transition: all 0.3s;
    &:focus {
        box-shadow: inset 4px 4px 25px #d3d3d3, inset -4px -4px 25px #ffffff;
    }
    @media only screen and (max-width: 450px) {
        width: calc(80% - 40px);
    }
`;
const ButtonInput = styled.button`
    width: 70%;
    height: 40px;
    color: #ffffff;
    margin: 40px 0 20px 0;
    border: none;
    border-radius: 15px;
    padding: 0 20px;
    background: #177bcc;
    outline: none;
    -webkit-box-shadow: 10px 10px 28px -15px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 28px -15px rgba(0, 0, 0, 0.75);
    transition: all 0.2s;
    &:active {
        -webkit-box-shadow: 10px 10px 28px -8px rgba(0, 0, 0, 0.75);
        box-shadow: 10px 10px 28px -8px rgba(0, 0, 0, 0.75);
    }
    @media only screen and (max-width: 450px) {
        width: 80%;
    }
`;
const LinkWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const LinkStyled = styled.a`
    color: #9d9d9d;
    text-decoration: none;
    cursor: pointer;
    margin: 2px 0;
`;

export default LoginPage;
