import styled, { css } from "styled-components";
import { selectChildren } from "../../selectors/fileSelectors";
import { FileType } from "../../store/fileSystemSlice";
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";

const Container = styled.div`
    padding: 8px;
    height: 100vh;
`;

const Item = styled.div<{ $active?: boolean }>`
    width: 48px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    > div {
        text-align: center;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    ${({ $active }) =>
        $active &&
        css`
            > div {
                background: #1e4d97;
                color: white;
            }
        `}
`;

const DesktopIcon = () => {
    const data = useAppSelector(selectChildren("Desktop"));
    const [selected, setSelected] = useState<string | undefined>();

    return (
        <Container>
            {data.map((e) =>
                e.type === FileType.Folder ? (
                    <Item
                        $active={selected === e.id}
                        onClick={() => setSelected(e.id)}
                    >
                        <img
                            width={48}
                            height={48}
                            src={`/__spritemap#sprite-ic_folder-view`}
                        />
                        <div>{e.name}</div>
                    </Item>
                ) : (
                    <div>121</div>
                ),
            )}
        </Container>
    );
};

export default DesktopIcon;
