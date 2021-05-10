import { memo } from 'react';
import styled from 'styled-components';

interface Props {
    title: string;
    setTitle: Function;
}

const TitleInput = ({ title, setTitle }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    return (
        <Container>
            <Input type="text" value={title} onChange={handleChange} />
        </Container>
    );
};

const Container = styled.div``;
const Input = styled.input``;

export default memo(TitleInput);
