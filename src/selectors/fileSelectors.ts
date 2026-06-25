import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { fileSystemAdapter } from "../store/fileSystemSlice";

const selectors = fileSystemAdapter.getSelectors<RootState>(
    (state) => state.fileSystem,
);

export const {
    selectAll: selectAllItems,
    selectById: selectItemById,
    selectEntities: selectEntities,
} = selectors;

export const selectChildren = (folderId: string | null) =>
    createSelector([selectAllItems], (items) =>
        items.filter((item) => item.parentId === folderId),
    );

export const selectFolderPath = (folderId: string) =>
    createSelector([selectEntities], (entities) => {
        const path = [];

        let current: any = entities[folderId];

        while (current) {
            path.unshift(current);

            current = current.parentId ? entities[current.parentId] : undefined;
        }

        return path;
    });
