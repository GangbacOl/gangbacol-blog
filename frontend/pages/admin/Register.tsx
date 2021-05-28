import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { register as _register } from '../../utils/api';
import { convertErrorToMsg } from '../../utils/errorBoundary';

const RegisterPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            const res = await _register(data);
            if (res.status === 201) {
                router.push('/admin/login');
            }
        } catch (error) {
            alert(convertErrorToMsg(error.response.data.errorCode));
        }
    };

    return (
        <Container>
            <HookForm onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="이름을 입력해주세요." {...register('username', { required: true })} />
                {errors.username && <span>This field is required</span>}
                <br />
                <Input placeholder="아이디를 입력해주세요." {...register('account', { required: true })} />
                <br />
                <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    {...register('password', { required: true })}
                />
                <Input type="submit" />
            </HookForm>
            <Link href="/admin/login">로그인하러 가기</Link>
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

export default RegisterPage;
