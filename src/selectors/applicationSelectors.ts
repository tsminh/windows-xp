import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const selectApplicationState = (state: RootState) => state.application;

export const selectInstalledApplications = createSelector(
    [selectApplicationState],
    (state) => state.installedIds.map((id) => state.installed[id]),
);

export const selectApplicationById = (id: string) => (state: RootState) =>
    state.application.installed[id];

export const selectApplicationByInternalType = (internalType: number) =>
    createSelector([selectInstalledApplications], (apps) =>
        apps.find((a) => a.internalType === internalType),
    );

export const selectPinnedTaskbarApplications = createSelector(
    [selectApplicationState],
    (state) => state.pinnedTaskbar.map((id) => state.installed[id]),
);

export const selectDefaultApplication = (extension: string) =>
    createSelector([selectApplicationState], (state) => {
        const appId = state.defaultApplications[extension.toLowerCase()];

        if (!appId) return undefined;

        return state.installed[appId];
    });

export const selectApplicationSupportingExtension = (extension: string) =>
    createSelector([selectInstalledApplications], (apps) =>
        apps.find((app) => app.extensions.includes(extension.toLowerCase())),
    );

export const selectIsPinned = (appId: string) =>
    createSelector([selectApplicationState], (state) =>
        state.pinnedTaskbar.includes(appId),
    );
