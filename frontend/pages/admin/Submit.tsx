import React, { useState, useLayoutEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { uploadPostImages, uploadPost } from '../../utils/api';

interface SubmitParamsIntf {
    title: string;
    description: string;
}

const SubmitPage = () => {
    const [images, setImages] = useState(null);
    const [markdown, setMarkdown] = useState(null);

    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const onSubmit = useCallback(
        (data: SubmitParamsIntf, images: FileList | null, markdown: FileList | null) => {
            if (markdown === null) return;

            const fileReader = new FileReader();

            fileReader.readAsText(markdown[0]);
            fileReader.onload = async (e: any) => {
                let content = e.target.result;
                let res;

                if (images !== null) {
                    const result = await uploadPostImages(images);

                    result.fileLocations.map((item: string) => {
                        const replaceText = `<img src="${item}">`;
                        content = content.replace(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/, replaceText);
                    });
                    res = await uploadPost(data.title, data.description, content, result.filenames);
                } else {
                    res = await uploadPost(data.title, data.description, content, []);
                }

                if (res.status === 200) {
                    router.push('/');
                }
            };
        },
        [images, markdown]
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setState: Function) =>
        setState(e.target.files);

    const drawFileList = (fileList: FileList | null) => {
        if (fileList !== null)
            return Array.from(fileList).map((file: any) => <UploadedFile>{file.name}</UploadedFile>);
    };

    useLayoutEffect(() => {
        if (!localStorage.getItem('token')) router.push('/');
    }, []);

    return (
        <Container>
            <SubmitBox>
                <HookForm
                    onSubmit={handleSubmit((data: SubmitParamsIntf) => onSubmit(data, images, markdown))}>
                    <TextInput placeholder="제목" {...register('title', { required: true })} />
                    <TextArea placeholder="간략한 설명" {...register('description', { required: true })} />
                    <FileWrap>
                        <FileLabel htmlFor="image">
                            이미지
                            <UploadedFileList>{images !== null && drawFileList(images)}</UploadedFileList>
                        </FileLabel>
                        <FileInput
                            id="image"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            multiple
                            onChange={(e) => handleFileChange(e, setImages)}
                        />
                        <FileLabel htmlFor="markdown">
                            마크다운
                            <UploadedFileList>{markdown !== null && drawFileList(markdown)}</UploadedFileList>
                        </FileLabel>
                        <FileInput
                            id="markdown"
                            type="file"
                            accept=".md"
                            onChange={(e) => handleFileChange(e, setMarkdown)}
                        />
                    </FileWrap>
                    <ButtonInput type="submit">저장</ButtonInput>
                </HookForm>
            </SubmitBox>
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
const SubmitBox = styled.div`
    width: 700px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 30px 0;
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
    margin: 10px 0;
    border: none;
    border-radius: 15px;
    padding: 0 20px;
    background: #f8f8f8;
    box-shadow: inset 4px 4px 8px #d3d3d3, inset -4px -4px 8px #ffffff;
    outline: none;
    transition: all 0.3s;
    font-size: 1.1rem;
    &:focus {
        box-shadow: inset 4px 4px 25px #d3d3d3, inset -4px -4px 25px #ffffff;
    }
    @media only screen and (max-width: 450px) {
        width: calc(80% - 40px);
    }
`;
const TextArea = styled.textarea`
    resize: none;
    width: calc(70% - 40px);
    height: 120px;
    margin: 10px 0;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
    background: #f8f8f8;
    box-shadow: inset 4px 4px 8px #d3d3d3, inset -4px -4px 8px #ffffff;
    outline: none;
    transition: all 0.3s;
    font-size: 1.1rem;
    font-family: inherit;
    font-weight: inherit;
    &:focus {
        box-shadow: inset 4px 4px 25px #d3d3d3, inset -4px -4px 25px #ffffff;
    }
    @media only screen and (max-width: 450px) {
        width: calc(80% - 40px);
    }
`;
const FileWrap = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 20px;
    @media only screen and (max-width: 450px) {
        width: 80%;
    }
`;
const FileLabel = styled.label`
    width: calc(50% - 20px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    border: none;
    border-radius: 15px;
    color: #9d9d9d;
`;
const UploadedFileList = styled.div``;
const UploadedFile = styled.p``;
const FileInput = styled.input`
    display: none;
`;
const ButtonInput = styled.button`
    width: 70%;
    height: 40px;
    color: #ffffff;
    margin: 20px 0;
    border: none;
    border-radius: 15px;
    padding: 0 20px;
    background: #177bcc;
    outline: none;
    -webkit-box-shadow: 10px 10px 28px -15px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 28px -15px rgba(0, 0, 0, 0.75);
    transition: all 0.3s;
    &:hover {
        -webkit-box-shadow: 10px 10px 28px -8px rgba(0, 0, 0, 0.75);
        box-shadow: 10px 10px 28px -8px rgba(0, 0, 0, 0.75);
    }
    @media only screen and (max-width: 450px) {
        width: 80%;
    }
`;

export default SubmitPage;
