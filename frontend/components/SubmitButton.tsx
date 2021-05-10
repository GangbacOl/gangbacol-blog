import { useState, memo } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { UPLOAD_IMAGE_URL, UPLOAD_MARKDOWN_URL } from '../utils/baseUrl';

interface Props {
    title: string;
    images: FileList | null;
    markdown: FileList | null;
}

const SubmitButton = ({ title, images, markdown }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = () => {
        if (!markdown || !images) return;
        setIsLoading(true);

        const fileReader = new FileReader();
        fileReader.readAsText(markdown[0]);
        fileReader.onload = async (e: any) => {
            let content = e.target.result;

            const formDataImage = new FormData();
            Array.from(images).forEach((image) => formDataImage.append('images', image));
            const res1 = await axios.post(UPLOAD_IMAGE_URL, formDataImage);

            res1.data.filesLocation.map((item: string) => {
                const replaceText = `<img src="${item}">`;
                content = content.replace(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/, replaceText);
            });

            const data = { title, content };
            await axios.post(UPLOAD_MARKDOWN_URL, data);
        };
    };
    return (
        <Container>
            <Button type="button" value="저장" onClick={handleClick} />
        </Container>
    );
};

const Container = styled.div``;
const Button = styled.input``;

export default memo(SubmitButton);
