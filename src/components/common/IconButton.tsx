import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
    border: none;
    padding: 0;
    background: none;
`;

const IconButton: React.FC<{
    icon: string;
    onClick?: () => void;
    width: number;
    height: number;
}> = ({ icon, onClick, width, height }) => {
    const [state, setState] = useState("idle");
    return (
        <Button
            onClick={onClick}
            onMouseOver={() => setState("hover")}
            onMouseLeave={() => setState("idle")}
            onMouseDown={() => setState("pressed")}
            onMouseUp={() => setState("idle")}
        >
            <img
                width={width}
                height={height}
                src={`/__spritemap#sprite-ic_${icon}_${state}-view`}
            />
        </Button>
    );
};

export default IconButton;
