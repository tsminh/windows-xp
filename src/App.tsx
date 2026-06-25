import Demo from "./components/common/Demo";
import { DragDropProvider } from "@dnd-kit/react";
import { bringToFront, updatePosition } from "./store/windowSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectActiveWindowId, selectWindows } from "./store/selectors";
import WindowFrame from "./components/common/WindowFrame";

function App() {
    const dispatch = useAppDispatch();

    const windows = useAppSelector(selectWindows);
    const activeWindowId = useAppSelector(selectActiveWindowId);

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
            {windows.map((e) => (
                <WindowFrame
                    active={activeWindowId === e.id}
                    onClick={() => dispatch(bringToFront(e.id))}
                    {...e}
                />
            ))}
            <Demo />
        </DragDropProvider>
    );
}

export default App;
