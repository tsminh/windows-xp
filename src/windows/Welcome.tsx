export const welcomeWindowMeta: IWindow = {
    title: "Welcome",
    id: "welcome",
    width: 300,
    height: 200,
    x: 500,
    y: 500,
    internalType: -1,
    zIndex: 1,
};

const Welcome = () => {
    return (
        <div>
            Hello this is Windows XP implemented with ReactJS.
            <br />
            By <i>tsminh</i>
        </div>
    );
};

export default Welcome;
