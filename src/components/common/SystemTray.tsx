import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 3px 8px 3px 11px;
    gap: 1px;
    height: 30px;
    color: #fff;
    background: linear-gradient(
        180deg,
        #095bc9 2.45%,
        #19b9f3 5.41%,
        #19b9f3 9.78%,
        #149eed 10.59%,
        #1290e8 19.47%,
        #0d8dea 60.17%,
        #0f9eef 80.89%,
        #119deb 90.27%,
        #226bce 97.21%
    );
    box-shadow: -1px 0px 1px rgba(0, 0, 0, 0.5);
`;

const SystemTray = () => {
    const [state, setState] = useState("idle");
    return (
        <Container>
            <img
                onMouseOver={() => setState("hover")}
                onMouseLeave={() => setState("idle")}
                onMouseDown={() => setState("pressed")}
                onMouseUp={() => setState("idle")}
                width={16}
                height={16}
                src={`/__spritemap#sprite-ic_taskbar_left_${state}-view`}
                style={{
                    position: "absolute",
                    left: 0,
                    transform: "translateX(-50%)",
                }}
            />
            10:30 AM
        </Container>
    );
};

export default SystemTray;
