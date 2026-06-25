import Button from "../components/common/Button";
import WindowFrame from "../components/common/WindowFrame";
import { WindowType } from "../constants";

export const windowPayload: IWindow = {
    title: "Run",
    internalType: WindowType.RUN,
    width: 363,
    height: 186,
    id: "",
    x: 0,
    y: 0,
    zIndex: 0,
};

const RunWindow: React.FC<IWindow> = (props) => {
    return (
        <WindowFrame {...props}>
            <div style={{ padding: 10 }}>
                <div
                    style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <img
                        width={39}
                        height={39}
                        src={`/__spritemap#sprite-ic_run-view`}
                    />
                    <div>
                        Input the name of a program, a folder, a document or an
                        Internet resource, and Windows will open it for you.
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 6,
                        justifyContent: "flex-end",
                    }}
                >
                    <Button>OK</Button>
                    <Button>Cancel</Button>
                    <Button>Browser...</Button>
                </div>
            </div>
        </WindowFrame>
    );
};

export default RunWindow;
