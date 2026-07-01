export const welcomeWindowMeta: IWindow = {
    title: "Welcome",
    id: "welcome",
    width: 300,
    height: 200,
    x: 500,
    y: 500,
    applicationId: "",
    zIndex: 1,
};

const Welcome = () => {
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "translateY(-5%)",
            }}
        >
            <div>
                Hello this is Windows XP implemented with ReactJS.
                <br />
                By <i>tsminh</i>
            </div>
        </div>
    );
};

export default Welcome;
