import styled from "styled-components";
import TaskBar from "./TaskBar";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url(/wallpaper.webp);
`;

const Demo = () => {
    return (
        <Container>
            <div></div>

            <div style={{ position: "absolute", bottom: 0, width: "100vw" }}>
                <TaskBar />
            </div>
        </Container>
    );
};

export default Demo;
