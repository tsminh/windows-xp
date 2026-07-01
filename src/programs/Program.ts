import { openWindow } from "@/store/windowSlice";
import { type ReactElement } from "react";
import { v4 as uuid } from "uuid";

class Program {
    static meta: {
        id: string;
        icon?: string;
        name: string;
        allowMultipleWindows?: boolean;
    } = {
        id: "",
        name: "no name",
    };

    static Component: ReactElement;

    public openWindow() {
        // window.appDispatch(
        //     openWindow({
        //         id: uuid(),
        //         applicationId: this.meta.id,
        //         width: 300,
        //         height: 200,
        //     }),
        // );
    }

    public install() {}

    public uninstall() {}
}

export default Program;
