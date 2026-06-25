import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export const selectWindows = (state: RootState) => state.window.windows;

export const selectActiveWindowId = (state: RootState) =>
    state.window.activeWindowId;

export const selectWindowsByInternalType = createSelector(
    [selectWindows],
    (windows) => {
        return windows.reduce<Record<number, typeof windows>>((acc, window) => {
            if (!acc[window.internalType]) {
                acc[window.internalType] = [];
            }

            acc[window.internalType].push(window);

            return acc;
        }, {});
    },
);
