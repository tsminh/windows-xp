import Program from "./Program";
import RunWindow from "@/windows/RunWindow";

class AppRun extends Program {
    // static meta!: {
    //     id: "run";
    //     icon: "run";
    //     name: "Run";
    //     allowMultipleWindows: false;
    // };

    Component = RunWindow;
}

export default AppRun;
