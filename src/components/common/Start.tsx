import { useState } from "react";
import styled from "styled-components";

const Container = styled.button`
    border: 0;
    padding: 0;
    background: none;
    display: flex;
    position: relative;
`;

const Start = () => {
    const [state, setState] = useState("idle");
    return (
        <Container
            onMouseOver={() => setState("hover")}
            onMouseDown={() => setState("pressed")}
            onMouseLeave={() => setState("idle")}
            onMouseUp={() => setState("idle")}
        >
            <img height={30} src={`/__spritemap#sprite-start_${state}-view`} />
        </Container>
    );
};

export default Start;
