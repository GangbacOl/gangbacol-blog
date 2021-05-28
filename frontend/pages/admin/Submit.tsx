import { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import TitleInput from '../../components/TitleInput';
import FileInput from '../../components/FileInput';
import SubmitButton from '../../components/SubmitButton';

const SubmitPage = () => {
    const [title, setTitle] = useState<string>('');
    const [images, setImages] = useState<FileList | null>(null);
    const [markdown, setMarkdown] = useState<FileList | null>(null);

    const router = useRouter();

    useLayoutEffect(() => {
        if (!localStorage.getItem('token')) router.push('/');
    }, []);

    return (
        <Container>
            <TitleInput title={title} setTitle={setTitle} />
            <FileInput images={images} markdown={markdown} setImages={setImages} setMarkdown={setMarkdown} />
            <SubmitButton title={title} images={images} markdown={markdown} router={router} />
        </Container>
    );
};

const Container = styled.div``;

export default SubmitPage;
