import { Application } from "@/constants";

const Explorer = () => {
    return (
        <div>
            <div></div>
        </div>
    );
};

export const explorerWindowMeta: IWindow = {
    title: "Explorer",
    applicationId: Application.EXPLORER,
    width: 363,
    height: 186,
    id: Application.EXPLORER,
    x: 0,
    y: 0,
    zIndex: 0,
};

export default Explorer;
