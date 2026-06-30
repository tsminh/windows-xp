interface IApplication {
    id: string;
    name: string;
    icon: string;
    internalType: number;
    extensions: string[];
    canOpenFolders?: boolean;
    multipleInstances?: boolean;
    desktopShortcut?: boolean;
    pinnedToTaskbar?: boolean;
}

interface IShortcut {
    id: string;
    appId?: string;
    targetFileId?: string;
    targetFolderId?: string;
    parentFolderId: string;
    name: string;
}
