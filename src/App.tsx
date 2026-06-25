import Demo from "./components/common/Demo";
import { DragDropProvider } from "@dnd-kit/react";
import { bringToFront, openWindow, updatePosition } from "./store/windowSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectActiveWindowId, selectWindows } from "./store/selectors";
import WindowFrame from "./components/common/WindowFrame";
import RunWindow, { windowPayload } from "./windows/RunWindow";
import Mousetrap from "mousetrap";
import { useEffect } from "react";
import { WindowType } from "./constants";

const getWindowByType = (type: WindowType, props: IWindow) => {
    switch (type) {
        case WindowType.RUN:
            return <RunWindow {...props} />;
        default:
            return <WindowFrame {...props} />;
    }
};

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
            {windows.map((e) => {
                const props = {
                    ...e,
                    active: activeWindowId === e.id,
                    onClick: () => dispatch(bringToFront(e.id)),
                };
                return getWindowByType(e.internalType, props);
            })}

            <Demo />
        </DragDropProvider>
    );
}

export default App;
