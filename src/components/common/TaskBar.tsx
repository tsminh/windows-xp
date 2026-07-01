import styled from "styled-components";
import Start from "./Start";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    selectActiveWindowId,
    selectWindowsByApplication,
} from "../../store/selectors";
import { useMemo } from "react";
import { bringToFront, unminimizeWindow } from "../../store/windowSlice";
import SystemTray from "./SystemTray";

const Container = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    z-index: 1000;
    height: 30px;
    background: linear-gradient(
        180deg,
        #3168d5 2.8%,
        #4993e6 6.99%,
        #286add 14.1%,
        #2359d6 19.93%,
        #2157d7 36.28%,
        #245ddb 57.21%,
        #2662df 75.35%,
        #2663e0 90.7%,
        #1e50c4 94.89%,
        #3155b0 100%
    );
`;

const TaskItem = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 15px 4px 10px;
    gap: 3px;

    width: 160px;
    min-width: 36px;
    max-width: 160px;
    height: 25px;
    font-size: 11px;
    color: white;
    border-radius: 3px;

    &[data-active="true"] {
        background: linear-gradient(180deg, #164dbc 0%, #184eb8 100%);
        border: 1px solid rgba(8, 41, 111, 0.5);
        box-shadow:
            inset 1px 0.5px 2px rgba(0, 0, 0, 0.5),
            inset -1px -1px 3px #2a5db6;
        &:hover {
            background: linear-gradient(180deg, #2f6fed 0%, #3674e8 100%);
            border: 1px solid rgba(8, 41, 111, 0.5);
            box-shadow:
                inset 2px 1.5px 2px rgba(0, 0, 0, 0.2),
                inset -1px -1px 2px #2a5db6;
        }
    }
    &[data-active="false"] {
        background: linear-gradient(
            180deg,
            #4892f7 0%,
            #397df3 29.8%,
            #3980f4 66.35%,
            #3981f4 100%
        );
        border: 1px solid rgba(8, 41, 111, 0.5);
        box-shadow:
            inset -1px -0.5px 3px #2652b0,
            inset 2px 0px 2px rgba(155, 197, 255, 0.5);
        &:hover {
            background: linear-gradient(
                180deg,
                #8bc0ff 0%,
                #55a3ff 29.8%,
                #55a0ff 66.35%,
                #569fff 100%
            );
            border: 1px solid rgba(9, 57, 168, 0.8);
            box-shadow:
                inset -1px -0.5px 3px #0051c8,
                inset 2px 0px 2px #9ccaff;
        }
    }
`;

const Leading = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 6px 0px 0px;
    gap: 6px;
    flex-grow: 1;
`;

const Group = styled.div`
    display: flex;
`;

const TaskBar = () => {
    const groups = useAppSelector(selectWindowsByApplication);
    const activeWindowId = useAppSelector(selectActiveWindowId);
    const groupActiveId = useMemo(
        () =>
            Object.keys(groups).findIndex((k) =>
                groups[k as any].find((w) => w.id === activeWindowId),
            ),
        [activeWindowId, groups],
    );

    const dispatch = useAppDispatch();

    return (
        <Container>
            <Leading>
                <Start />
                <Group>
                    {Object.keys(groups).map((key, groupIndex) => (
                        <TaskItem
                            onClick={() => {
                                if (groups[key]) {
                                    dispatch(
                                        unminimizeWindow(groups[key][0].id),
                                    );
                                    dispatch(bringToFront(groups[key][0].id));
                                }
                            }}
                            data-active={groupActiveId === groupIndex}
                        >
                            <img
                                width={16}
                                height={16}
                                src={`/__spritemap#sprite-ic_${key}_small-view`}
                            />
                            {groups[key]?.[0].title}
                        </TaskItem>
                    ))}
                </Group>
            </Leading>
            <SystemTray />
        </Container>
    );
};

export default TaskBar;
