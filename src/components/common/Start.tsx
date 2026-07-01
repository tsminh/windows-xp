import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useClickOutside } from "../../hooks/useClickOutside";
import SquareButton from "./SquareButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openWindow } from "../../store/windowSlice";
import { welcomeWindowMeta } from "../../windows/Welcome";
import { selectIsStartOpen } from "@/selectors/startSelectors";
import { toggleStart } from "@/store/startSlice";

const Container = styled.button`
    border: 0;
    padding: 0;
    background: none;
    display: flex;
    position: relative;
`;

const StartContainer = styled.div`
    width: 380px;
    height: 478px;
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 31px;
    left: 0;
    z-index: 10000;
    overflow: hidden;

    border: 1px solid #215cc5;
    box-shadow:;
    border-radius: 6px 6px 0px 0px;

    background: linear-gradient(
        180deg,
        #74aae8 0%,
        #1969d2 0.78%,
        #2174db 6.39%,
        #4792ec 13.18%,
        #448be3 91.95%,
        #2577df 95.86%,
        #0d5bc7 100%
    );
    box-shadow:
        inset 5px 0px 6px -4px #91a3d9,
        inset 0px -5px 40px 10px rgba(9, 74, 189, 0.66),
        2px 2px 4px rgba(0, 0, 0, 0.5),
        inset -4px 0px 4px -1px rgba(0, 46, 137, 0.25);
`;

const Left = styled.div`
    flex: 1;
    background: #fff;
`;
const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 6px 2px;
    gap: 4px;
    width: 188px;
    background: #d3e5fa;
    border-left: 1px solid #95bdee;
    gap: 4px;

    > div {
        height: 26px;
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #0a236a;
        padding: 1px;
        gap: 4px;

        &:hover {
            background: #316ac5;
        }
    }

    > hr {
        margin: 0 21px;
        width: calc(100% - 42px);
        border: none;
        height: 1px;
        background: linear-gradient(
            90deg,
            #bad6fd 0%,
            #80b6ff 50%,
            #b5d3fc 100%
        );
    }
`;

const StartTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px;
    gap: 10px;
    height: 64px;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #ffffff;
    text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    position: relative;

    &:after {
        position: absolute;
        height: 3px;
        left: 0px;
        bottom: 0px;
        width: 100%;
        content: "";
        background: linear-gradient(
            90deg,
            rgba(255, 138, 29, 0) 0%,
            #ff8a1d 50%,
            rgba(255, 138, 29, 0) 100%
        );
    }
`;

const StartBottom = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    padding: 7px 10px;
    gap: 10px;

    > div {
        &:hover {
            background: #316ac5;
        }
    }
`;

const Start = () => {
    const [state, setState] = useState("idle");
    const open = useAppSelector(selectIsStartOpen);
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const handleToggleStart = useCallback(() => {
        dispatch(toggleStart());
    }, [dispatch]);

    useClickOutside(ref, handleToggleStart);

    return (
        <>
            {open && (
                <StartContainer data-ignore-context-menu ref={ref}>
                    <StartTop>Tsminh</StartTop>
                    <div style={{ display: "flex", flex: 1 }}>
                        <Left></Left>
                        <Right>
                            <div
                                onClick={() => {
                                    dispatch(openWindow(welcomeWindowMeta));
                                }}
                            >
                                Welcome
                            </div>
                            <div>Installed applications</div>
                            <div>Run...</div>
                            <hr />
                        </Right>
                    </div>
                    <StartBottom>
                        <div>
                            <SquareButton label="Logout" active />
                        </div>
                        <div>
                            <SquareButton label="Turn off" active danger />
                        </div>
                    </StartBottom>
                </StartContainer>
            )}
            <Container
                onClick={handleToggleStart}
                onMouseOver={() => setState("hover")}
                onMouseDown={() => setState("pressed")}
                onMouseUp={() => setState("idle")}
            >
                <img
                    height={30}
                    src={`/__spritemap#sprite-start_${open ? "pressed" : state}-view`}
                />
            </Container>
        </>
    );
};

export default Start;
