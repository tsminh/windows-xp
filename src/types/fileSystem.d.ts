interface IFileSystemItem {
    id: string;
    name: string;
    type: FileType;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface IFile extends IFileSystemItem {
    type: FileType.File;
    extension?: string;
    size?: number;
    content?: string;
}

interface IFolder extends IFileSystemItem {
    type: FileType.Folder;
}

type INode = IFile | IFolder;
