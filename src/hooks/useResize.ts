import { useCallback } from "react";

type ResizeDirection = "right" | "bottom" | "corner";

export function useResize({
    width,
    height,
    onResize,
}: {
    width: number;
    height: number;
    onResize: (width: number, height: number) => void;
}) {
    const startResize = useCallback(
        (direction: ResizeDirection) => (e: React.PointerEvent) => {
            e.preventDefault();

            const startX = e.clientX;
            const startY = e.clientY;

            const startWidth = width;
            const startHeight = height;

            const move = (event: PointerEvent) => {
                const dx = event.clientX - startX;

                const dy = event.clientY - startY;

                let newWidth = startWidth;
                let newHeight = startHeight;

                if (direction === "right" || direction === "corner") {
                    newWidth = Math.max(300, startWidth + dx);
                }

                if (direction === "bottom" || direction === "corner") {
                    newHeight = Math.max(200, startHeight + dy);
                }

                onResize(newWidth, newHeight);
            };

            const up = () => {
                window.removeEventListener("pointermove", move);
                window.removeEventListener("pointerup", up);
            };

            window.addEventListener("pointermove", move);
            window.addEventListener("pointerup", up);
        },
        [width, height, onResize],
    );

    return startResize;
}
