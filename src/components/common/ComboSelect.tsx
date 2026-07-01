import styled from "styled-components";
import IconButton from "./IconButton";
import type { CSSProperties } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 21px;
    background: #ffffff;
    border: 1px solid #7f9db9;

    input {
        flex: 1;
        border: none;
        outline: none;
        padding: 0;
        height: 100%;
        padding: 4px;
    }

    > button img {
        display: block;
    }
`;

const ComboSelect: React.FC<{
    style?: CSSProperties;
    placeholder?: string;
}> = ({ style, placeholder }) => {
    return (
        <Container style={style}>
            <input placeholder={placeholder} />
            <IconButton width={17} height={19} icon="square_dropdown" />
        </Container>
    );
};

export default ComboSelect;
