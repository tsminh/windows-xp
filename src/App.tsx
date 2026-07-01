import { DragDropProvider } from "@dnd-kit/react";
import { bringToFront, openWindow, updatePosition } from "./store/windowSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectActiveWindowId, selectWindows } from "./store/selectors";
import WindowFrame from "./components/common/WindowFrame";
import RunWindow, { windowPayload } from "./windows/RunWindow";
import Mousetrap from "mousetrap";
import { useEffect } from "react";
import { Application } from "./constants";
import GlobalContextMenu from "./components/common/GlobalContextMenu";
import { selectAllItems } from "./selectors/fileSelectors";
import DesktopIcon from "./components/complex/DesktopIcons";
import styled from "styled-components";
import TaskBar from "./components/common/TaskBar";
import Welcome from "./windows/Welcome";
import Explorer from "./windows/Explorer";

const getApplicationWindow = (type: string, props: IWindow) => {
    switch (type) {
        case Application.EXPLORER:
            return <Explorer />;
        case Application.RUN:
            return <RunWindow {...props} />;
        default:
            return <Welcome />;
    }
};

const applicationLists = [];

const Wallpaper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url(/wallpaper.webp);
    position: fixed;
`;

function App() {
    const dispatch = useAppDispatch();

    const windows = useAppSelector(selectWindows);
    const activeWindowId = useAppSelector(selectActiveWindowId);

    useEffect(() => {
        Mousetrap.bind(["command+r"], function () {
            dispatch(openWindow({ ...windowPayload }));
            return false;
        });
    }, [dispatch]);

    const data = useAppSelector(selectAllItems);

    return (
        <DragDropProvider
            onDragStart={(event) => {
                if (!event.operation.source) return;
                const id = event.operation.source.id as string;
                dispatch(bringToFront(id));
            }}
            onDragEnd={(event) => {
                if (event.canceled || !event.operation.source) return;
                const id = event.operation.source.id as string;
                const { left: x, top: y } =
                    event.operation.shape!.current.boundingRectangle;
                dispatch(updatePosition({ id, x, y }));
            }}
        >
            <GlobalContextMenu>
                <Wallpaper>
                    {windows.map((e) => {
                        const props = {
                            ...e,
                            active: activeWindowId === e.id,
                        };
                        return e.minimized ? null : (
                            <WindowFrame {...props}>
                                {getApplicationWindow(e.applicationId, props)}
                            </WindowFrame>
                        );
                    })}
                    <DesktopIcon />
                    <TaskBar />
                </Wallpaper>
            </GlobalContextMenu>
        </DragDropProvider>
    );
}

export default App;
