import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export const selectWindows = (state: RootState) => state.window.windows;

export const selectActiveWindowId = (state: RootState) =>
    state.window.activeWindowId;

export const selectWindowsByApplication = createSelector(
    [selectWindows],
    (windows) => {
        return windows.reduce<Record<string, typeof windows>>((acc, window) => {
            if (!acc[window.applicationId]) {
                acc[window.applicationId] = [];
            }

            acc[window.applicationId].push(window);

            return acc;
        }, {});
    },
);
