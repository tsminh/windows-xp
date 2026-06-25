import styled from "styled-components";

const Button = styled.button`
    display: flex;
    padding: 1px;
    width: 75px;
    justify-content: center;
    min-width: 75px;
    height: 23px;
    padding: 3px 12px;

    background: linear-gradient(180deg, #ffffff 0%, #f0f0ea 100%);
    border: 1px solid #1c5180;
    box-shadow:
        1px 1px 0px rgba(255, 255, 255, 0.75),
        -1px -1px 0px rgba(0, 0, 0, 0.05),
        inset 1.5px 1.5px 2px #ffffff,
        inset -1.5px -2.5px 2px rgba(83, 55, 0, 0.2);
    border-radius: 2.5px;
    text-align: center;

    &:hover {
        background: linear-gradient(180deg, #ffffff 0%, #f0f0ea 100%);
        border: 1px solid #1c5180;
        box-shadow:
            1px 1px 0px rgba(255, 255, 255, 0.75),
            -1px -1px 0px rgba(0, 0, 0, 0.05),
            inset 0px 1.5px 2px 0.5px rgba(255, 255, 255, 0.75),
            inset 0px -3.5px 2px -2px rgba(0, 0, 0, 0.25),
            inset 0px -2.5px 2px -2px #00000082,
            inset 0px 0px 0px 3px #fbca6a;
    }

    &:active {
        background: linear-gradient(180deg, #e5e4dd 0%, #e0e0d7 100%);
        border: 1px solid #1c5180;
        box-shadow:
            1px 1px 0px rgba(255, 255, 255, 0.75),
            -1px -1px 0px rgba(0, 0, 0, 0.05),
            inset -1.5px -1.5px 2px #ffffff,
            inset 1.5px 2.5px 2px rgba(83, 55, 0, 0.2);
    }
`;

export default Button;
