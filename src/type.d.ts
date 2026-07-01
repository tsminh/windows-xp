interface IWindow {
    id: string;
    icon?: string;
    title?: string;

    applicationId: string;
    externalIFrame?: string;

    width: number;
    height: number;

    x?: number;
    y?: number;

    zIndex?: number;

    minimized?: boolean;
    maximized?: boolean;
}
