import { useEffect } from "react";

export function useClickOutside(
    ref: React.RefObject<HTMLElement | null>,
    callback: () => void,
) {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            const target = event.target as HTMLElement;

            if (target.closest("[data-window-id]")) {
                return;
            }

            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClick, true);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [ref, callback]);
}
