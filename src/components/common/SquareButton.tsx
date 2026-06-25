import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.button`
    border: 0;
    padding: 0;
    background: none;
    display: flex;
`;

const getDefaultState = (active?: boolean) => (active ? "active" : "inactive");

const SquareButton: React.FC<{ active?: boolean; onClick?: () => void }> = ({
    active,
    onClick,
}) => {
    const [state, setState] = useState(() => getDefaultState(active));

    useEffect(() => {
        setState(getDefaultState(active));
    }, [active]);

    return (
        <Container
            onClick={onClick}
            onMouseOver={() => setState("hover")}
            onMouseDown={() => setState("clicked")}
            onMouseLeave={() => setState(getDefaultState(active))}
            onMouseUp={() => setState(getDefaultState(active))}
        >
            <img
                width={22}
                height={22}
                src={`/__spritemap#sprite-square_${state}-view`}
            />
        </Container>
    );
};

export default SquareButton;
