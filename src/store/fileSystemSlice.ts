import {
    createEntityAdapter,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

export const fileSystemAdapter = createEntityAdapter<INode>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export enum FileType {
    Folder = "folder",
    File = "file",
}

export const ROOT_FOLDER_ID = "root";

const initialState = fileSystemAdapter.getInitialState({
    currentFolderId: ROOT_FOLDER_ID,
});

const collectChildren = (
    entities: Record<string, INode>,
    id: string,
): string[] => {
    const children = Object.values(entities).filter(
        (item): item is INode => !!item && item.parentId === id,
    );

    return [
        id,
        ...children.flatMap((child) => collectChildren(entities, child.id)),
    ];
};

const fileSystemSlice = createSlice({
    name: "fileSystem",

    initialState,

    reducers: {
        createFolder: (
            state,
            action: PayloadAction<{
                name: string;
                parentId: string | null;
            }>,
        ) => {
            const id = crypto.randomUUID();

            fileSystemAdapter.addOne(state, {
                id,
                name: action.payload.name,

                type: FileType.Folder,

                parentId: action.payload.parentId,

                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        },

        createFile: (
            state,
            action: PayloadAction<{
                name: string;
                parentId: string | null;

                extension?: string;
                size?: number;
            }>,
        ) => {
            const id = crypto.randomUUID();

            fileSystemAdapter.addOne(state, {
                id,
                name: action.payload.name,

                type: FileType.File,

                parentId: action.payload.parentId,

                extension: action.payload.extension,
                size: action.payload.size,

                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        },

        renameItem: (
            state,
            action: PayloadAction<{
                id: string;
                name: string;
            }>,
        ) => {
            fileSystemAdapter.updateOne(state, {
                id: action.payload.id,

                changes: {
                    name: action.payload.name,
                    updatedAt: new Date().toISOString(),
                },
            });
        },

        moveItem: (
            state,
            action: PayloadAction<{
                id: string;
                parentId: string | null;
            }>,
        ) => {
            fileSystemAdapter.updateOne(state, {
                id: action.payload.id,

                changes: {
                    parentId: action.payload.parentId,
                    updatedAt: new Date().toISOString(),
                },
            });
        },

        deleteItem: (state, action: PayloadAction<string>) => {
            const ids = collectChildren(
                state.entities as Record<string, INode>,
                action.payload,
            );

            fileSystemAdapter.removeMany(state, ids);
        },

        setCurrentFolder: (state, action: PayloadAction<string>) => {
            state.currentFolderId = action.payload;
        },
    },
});

export const {
    createFolder,
    createFile,

    renameItem,
    moveItem,

    deleteItem,

    setCurrentFolder,
} = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
