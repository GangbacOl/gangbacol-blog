import { useState } from 'react';
import styled from 'styled-components';

interface Props {
    title: string;
    images: File | null;
    markdown: FileList | null;
}

const SubmitButton = ({ title, images, markdown }: Props) => {
    const [text, setText] = useState<string>('');
    const handleClick = () => {
        let fileReader = new FileReader();
        if (markdown) {
            console.log(markdown[0]);
            fileReader.readAsText(markdown[0]);
            fileReader.onload = function (e: any) {
                setText(e.target.result);
            };
        }
    };
    return (
        <Container>
            <Button type="button" value="저장" onClick={handleClick} />
            <p>{text.replace(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/, '이미지 링크')}</p>
        </Container>
    );
};

const Container = styled.div``;
const Button = styled.input``;

export default SubmitButton;
