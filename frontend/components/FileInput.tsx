import React from 'react';
import styled from 'styled-components';

interface Props {
    images: File | null;
    markdown: File | null;
    setImages: Function;
    setMarkdown: Function;
}

const FileInput = ({ images, markdown, setImages, setMarkdown }: Props) => {
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => setImages(e.target.files);
    const handleMarkdown = (e: React.ChangeEvent<HTMLInputElement>) => setMarkdown(e.target.files);

    return (
        <Container>
            <Label>
                <Title>이미지 첨부</Title>
                <ImageInput
                    id="image"
                    type="file"
                    onChange={handleImage}
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                />
            </Label>
            <Label>
                <Title>마크다운 첨부</Title>
                <MarkdownInput id="markdown" type="file" onChange={handleMarkdown} accept=".md" />
            </Label>
        </Container>
    );
};

const Container = styled.div``;
const Title = styled.h2``;
const Label = styled.div``;
const ImageInput = styled.input``;
const MarkdownInput = styled.input``;

export default FileInput;
