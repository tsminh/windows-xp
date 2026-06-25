import { useMemo, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useAppDispatch } from "../../store/hooks";
import { createFolder } from "../../store/fileSystemSlice";

const Hr = styled.hr`
    margin: 4px 0;
    width: 100%;
    border: 1px solid #aca899;
`;

const Container = styled.section`
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3px;
    width: 184px;
    background: #ffffff;
    border: 1px solid #aca899;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
`;

const SubContainer = styled(Container)`
    display: none;
    right: 0px;
    position: absolute;
    transform: translate(100%, 9px);
`;

const Item = styled.div`
    position: relative;
    padding: 0 2px;
    height: 17px;
    display: flex;
    align-items: center;
    width: 100%;
    &:hover {
        color: #fff;
        background: #316ac5;
        ${SubContainer} {
            display: block;
        }
    }
`;

interface ItemType {
    title: string;
    icon?: string;
    children?: ItemType[];
    disabled?: boolean;
    onClick?: () => void;
    isDivider?: boolean;
}

const getIconPrefix = (icon?: string) =>
    icon ? (
        <img
            width={16}
            height={16}
            src={`/__spritemap#sprite-${icon}-view`}
            style={{ marginRight: 2 }}
        />
    ) : (
        <div
            style={{
                width: 16,
                height: 16,
                marginRight: 2,
            }}
        />
    );

const GlobalContextMenu: React.FC<{ children?: ReactNode }> = ({
    children,
}) => {
    const [show, setShow] = useState({ visible: false, x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setShow((v) => ({ ...v, visible: false })));
    const dispatch = useAppDispatch();

    const options = useMemo(
        () =>
            [
                { title: "View" },
                { title: "Sort by" },
                { isDivider: true },
                {
                    title: "New",
                    children: [
                        {
                            title: "New folder",
                            icon: "ic_folder_small",
                            onClick: () =>
                                dispatch(
                                    createFolder({
                                        name: "Untitled",
                                        parentId: "Desktop",
                                    }),
                                ),
                        },
                        { title: "New text" },
                    ],
                },
            ] as ItemType[],
        [],
    );

    return (
        <div
            onContextMenu={(e) => {
                console.log(e);
                setShow({
                    visible: true,
                    x: e.clientX + 4,
                    y: e.clientY + 4,
                });
                e.preventDefault();
                return false;
            }}
        >
            {children}
            {show.visible && (
                <Container
                    onClick={() => {
                        setShow((v) => ({ ...v, visible: false }));
                    }}
                    ref={ref}
                    style={{ left: show.x, top: show.y }}
                >
                    {options.map((e) =>
                        e.isDivider ? (
                            <Hr />
                        ) : (
                            <Item onClick={e.onClick}>
                                {getIconPrefix(e.icon)}
                                {e.title}
                                {e.children && e.children.length > 0 && (
                                    <SubContainer>
                                        {e.children?.map((ee) => (
                                            <Item onClick={ee.onClick}>
                                                {getIconPrefix(ee.icon)}
                                                {ee.title}
                                            </Item>
                                        ))}
                                    </SubContainer>
                                )}
                            </Item>
                        ),
                    )}
                </Container>
            )}
        </div>
    );
};

export default GlobalContextMenu;
