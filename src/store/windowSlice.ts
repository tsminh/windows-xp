import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WindowState {
    windows: IWindow[];
    activeWindowId: string | null;

    nextZIndex: number;
}

const initialState: WindowState = {
    windows: [],
    activeWindowId: null,
    nextZIndex: 1,
};

const windowSlice = createSlice({
    name: "window",
    initialState,
    reducers: {
        resetActiveWindow: (state) => {
            state.activeWindowId = null;
        },
        openWindow: (state, action: PayloadAction<Omit<IWindow, "zIndex">>) => {
            const existed = state.windows.find(
                (w) => w.id === action.payload.id,
            );

            if (existed) {
                existed.zIndex = state.nextZIndex++;

                existed.minimized = false;

                state.activeWindowId = existed.id;

                return;
            }

            state.windows.push({
                ...action.payload,

                zIndex: state.nextZIndex++,

                minimized: false,

                maximized: false,
            });

            state.activeWindowId = action.payload.id;
        },

        closeWindow: (state, action: PayloadAction<string>) => {
            state.windows = state.windows.filter(
                (w) => w.id !== action.payload,
            );

            if (state.activeWindowId === action.payload) {
                state.activeWindowId = state.windows.at(-1)?.id ?? null;
            }
        },

        bringToFront: (state, action: PayloadAction<string>) => {
            const window = state.windows.find((w) => w.id === action.payload);

            if (!window) return;

            window.zIndex = state.nextZIndex++;

            state.activeWindowId = window.id;
        },

        updatePosition: (
            state,
            action: PayloadAction<{
                id: string;
                x: number;
                y: number;
            }>,
        ) => {
            const window = state.windows.find(
                (w) => w.id === action.payload.id,
            );

            if (!window) return;

            window.x = action.payload.x;
            window.y = action.payload.y;
        },

        updateSize: (
            state,
            action: PayloadAction<{
                id: string;
                width: number;
                height: number;
            }>,
        ) => {
            const window = state.windows.find(
                (w) => w.id === action.payload.id,
            );

            if (!window) return;

            window.width = action.payload.width;
            window.height = action.payload.height;
        },

        minimizeWindow: (state, action: PayloadAction<string>) => {
            const window = state.windows.find((w) => w.id === action.payload);

            if (!window) return;

            window.minimized = true;
            console.log(state.activeWindowId, window.id);
            if (state.activeWindowId === window.id) {
                state.activeWindowId = null;
            }
        },

        unminimizeWindow: (state, action: PayloadAction<string>) => {
            const window = state.windows.find((w) => w.id === action.payload);
            if (!window) return;
            window.minimized = false;
        },

        toggleMaximize: (state, action: PayloadAction<string>) => {
            const window = state.windows.find((w) => w.id === action.payload);

            if (!window) return;

            window.maximized = !window.maximized;
        },
    },
});

export const {
    openWindow,
    closeWindow,
    resetActiveWindow,

    updatePosition,
    updateSize,

    bringToFront,

    minimizeWindow,
    unminimizeWindow,
    toggleMaximize,
} = windowSlice.actions;

export default windowSlice.reducer;
