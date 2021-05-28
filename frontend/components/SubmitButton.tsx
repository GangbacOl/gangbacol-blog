import { memo } from 'react';
import { NextRouter } from 'next/router';
import styled from 'styled-components';

import { uploadPostImages, uploadPost } from '../utils/api';

interface Props {
    title: string;
    images: FileList | null;
    markdown: FileList | null;
    router: NextRouter;
}

const SubmitButton = ({ title, images, markdown, router }: Props) => {
    const handleSubmit = () => {
        if (!markdown || !images) return;

        const fileReader = new FileReader();
        fileReader.readAsText(markdown[0]);
        fileReader.onload = async (e: any) => {
            let content = e.target.result;

            const result = await uploadPostImages(images);

            result.fileLocations.map((item: string) => {
                const replaceText = `<img src="${item}">`;
                content = content.replace(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/, replaceText);
            });

            const res = await uploadPost(title, content, result.filenames);

            if (res.status === 200) {
                router.push('/');
            }
        };
    };

    return (
        <Container>
            <Button type="button" value="저장" onClick={handleSubmit} />
        </Container>
    );
};

const Container = styled.div``;
const Button = styled.input``;

export default memo(SubmitButton);
