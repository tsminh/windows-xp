export enum WindowType {
    Explorer = 1,
    ImageViewer,
    MusicPlayer,
    VideoPlayer,
    TextEditor,
    Browser,
}

interface ApplicationState {
    installed: Record<string, IApplication>;
    installedIds: string[];
    pinnedTaskbar: string[];
    defaultApplications: Record<string, string>;
}

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ApplicationState {
    installed: Record<string, IApplication>;

    installedIds: string[];

    pinnedTaskbar: string[];

    defaultApplications: Record<string, string>;
}

const initialState: ApplicationState = {
    installed: {},
    installedIds: [],
    pinnedTaskbar: [],
    defaultApplications: {},
};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        installApplication(state, action: PayloadAction<IApplication>) {
            const app = action.payload;

            state.installed[app.id] = app;

            if (!state.installedIds.includes(app.id)) {
                state.installedIds.push(app.id);
            }
        },

        uninstallApplication(state, action: PayloadAction<string>) {
            const appId = action.payload;

            delete state.installed[appId];

            state.installedIds = state.installedIds.filter(
                (id) => id !== appId,
            );

            state.pinnedTaskbar = state.pinnedTaskbar.filter(
                (id) => id !== appId,
            );

            Object.keys(state.defaultApplications).forEach((ext) => {
                if (state.defaultApplications[ext] === appId) {
                    delete state.defaultApplications[ext];
                }
            });
        },

        pinTaskbar(state, action: PayloadAction<string>) {
            if (!state.pinnedTaskbar.includes(action.payload)) {
                state.pinnedTaskbar.push(action.payload);
            }
        },

        unpinTaskbar(state, action: PayloadAction<string>) {
            state.pinnedTaskbar = state.pinnedTaskbar.filter(
                (id) => id !== action.payload,
            );
        },

        registerDefaultApplication(
            state,
            action: PayloadAction<{
                extension: string;

                appId: string;
            }>,
        ) {
            state.defaultApplications[action.payload.extension.toLowerCase()] =
                action.payload.appId;
        },

        updateApplication(state, action: PayloadAction<IApplication>) {
            state.installed[action.payload.id] = action.payload;
        },
    },
});

export const {
    installApplication,
    uninstallApplication,

    pinTaskbar,
    unpinTaskbar,

    registerDefaultApplication,

    updateApplication,
} = applicationSlice.actions;

export default applicationSlice.reducer;
