import { useEffect, useState, type MouseEvent } from "react";
import styled from "styled-components";

const Container = styled.button`
    border: 0;
    padding: 0;
    background: none;
    display: flex;
    align-items: center;

    > label {
        padding: 6.5px 2px 6.5px 5px;
        color: #fff;
    }
`;

const getDefaultState = (active?: boolean) => (active ? "active" : "inactive");

const SquareButton: React.FC<{
    danger?: boolean;
    active?: boolean;
    ic?: string;
    label?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ active, onClick, danger, ic, label }) => {
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
            <div style={{ position: "relative", display: "flex" }}>
                <img
                    width={22}
                    height={22}
                    src={`/__spritemap#sprite-square_${danger ? "danger_" : ""}${state}-view`}
                />
                <img
                    width={13}
                    height={13}
                    src={`/__spritemap#sprite-ic_${ic}-view`}
                    style={{ position: "absolute", left: 5, top: 5 }}
                />
            </div>
            {label && <label>{label}</label>}
        </Container>
    );
};

export default SquareButton;
