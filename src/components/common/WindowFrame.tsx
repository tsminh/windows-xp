import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import styled, { css } from "styled-components";
import { useDraggable } from "@dnd-kit/react";
import SquareButton from "@/components/common/SquareButton";
import {
    bringToFront,
    closeWindow,
    minimizeWindow,
    resetActiveWindow,
    toggleMaximize,
} from "@/store/windowSlice";
import { useAppDispatch } from "@/store/hooks";
import { useClickOutside } from "@/hooks/useClickOutside";

const Header = styled.div`
    height: 29px;
    background: linear-gradient(
        180deg,
        #3d95ff 6.7%,
        #0372ff 10.36%,
        #0365f1 13.89%,
        #0053e1 25.84%,
        #0058ee 56.29%,
        #026afe 74.1%,
        #026afe 84.7%,
        #0060fc 90.79%,
        #0043cf 96.43%
    );
    box-shadow:
        inset 8px 0px 5px -5px rgba(34, 37, 46, 0.54),
        inset -8px 0px 5px -5px rgba(0, 15, 102, 0.66);
    border-radius: 8px 8px 0px 0px;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
`;

const Title = styled.div`
    padding: 5px 0;
    color: #ffffff;
    flex: 1;
    font-size: 13px;
    display: flex;
    align-items: flex-end;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
`;

const HeaderButton = styled.div`
    display: flex;
    padding: 3px 0;
    gap: 4px;
`;

const BarRight = styled.div`
    position: absolute;
    width: 3px;
    height: calc(100% - 3px);
    right: 0;
    background: #002ebe;
    box-shadow:
        inset -3.5px 0px 1px -2px #00138c,
        inset 3.5px 3.5px 1px -2px #0048f1;
`;

const BarBottom = styled.div`
    height: 3px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #002ebe;
    box-shadow:
        inset -3.5px -3.5px 1px -2px #00138c,
        inset 4px 0px 4px -2px #0017c1,
        inset -3px 0px 2px -2px #002dbe,
        inset 5px 3.5px 1px -2px #0048f1;
`;

const BarLeft = styled.div`
    position: absolute;
    width: 3px;
    height: calc(100% - 3px);
    left: 0;
    background: #1255e7;
    border-bottom: 1px solid #0855dd;
    box-shadow:
        inset -4px 0px 1px -2px #166aee,
        inset 3px 0px 1px -2px #0019cf;
`;

const Content = styled.div`
    position: relative;
`;

const MainContent = styled.main`
    margin: 0 3px 3px 3px;
    height: calc(100% - 3px);
    width: calc(100% - 6px);
    font-size: 11px;
    position: relative;
    z-index: 100;
    background: #ece9d8;

    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
`;

const Container = styled.section<{ $active?: boolean }>`
    position: absolute;

    ${({ $active }) =>
        !$active &&
        css`
            &:after {
                pointer-events: none;
                top: 0;
                display: block;
                position: absolute;
                content: "";
                width: 100%;
                height: 100%;
                z-index: 1;
                border-radius: 8px 8px 0px 0px;
                background: rgba(246, 237, 237, 0.5);
            }
        `}
`;

const WindowFrame: React.FC<
    IWindow & { children?: ReactNode; active?: boolean }
> = ({
    children,
    id,
    title,
    x,
    y,
    width,
    height,
    zIndex,
    active,
    externalIFrame,
    maximized,
    applicationId,
}) => {
    const { ref, handleRef } = useDraggable({ id });
    const innerRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const handleMinimize = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            dispatch(minimizeWindow(id));
        },
        [dispatch, id],
    );
    const handleClose = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            dispatch(closeWindow(id));
        },
        [dispatch, id],
    );

    const handleToggleMaximize = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            dispatch(toggleMaximize(id));
        },
        [dispatch, id],
    );

    const onClick = useCallback(() => {
        dispatch(bringToFront(id));
    }, [dispatch, id]);

    useClickOutside(innerRef, () => {
        dispatch(resetActiveWindow());
    });

    return (
        <Container
            $active={active}
            onClick={onClick}
            ref={ref}
            style={{
                width,
                height,
                left: x,
                top: y,
                zIndex,
            }}
        >
            <div ref={innerRef}>
                <Header>
                    <Title ref={handleRef}>
                        <img
                            width={16}
                            height={16}
                            src={`/__spritemap#sprite-ic_${applicationId}_small-view`}
                            style={{ marginRight: 4 }}
                        />
                        {title}
                    </Title>
                    <HeaderButton>
                        <SquareButton
                            onClick={handleMinimize}
                            ic="control_minimize"
                            active={active}
                        />
                        <SquareButton
                            onClick={handleToggleMaximize}
                            ic={
                                maximized
                                    ? "control_unmaximize"
                                    : "control_maximize"
                            }
                            active={active}
                        />
                        <SquareButton
                            ic="control_close"
                            danger
                            active={active}
                            onClick={handleClose}
                        />
                    </HeaderButton>
                </Header>
                <Content style={{ height: `calc(${height}px - 29px)` }}>
                    <BarBottom />
                    <BarRight />
                    <BarLeft />
                    <MainContent>
                        {externalIFrame && <iframe src={externalIFrame} />}
                        {children}
                    </MainContent>
                </Content>
            </div>
        </Container>
    );
};

export default WindowFrame;
