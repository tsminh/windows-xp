import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StartState {
    startOpen: boolean;
}

const initialState: StartState = {
    startOpen: false,
};

const startSlice = createSlice({
    name: "start",
    initialState,
    reducers: {
        toggleStart(state, action: PayloadAction<boolean | undefined>) {
            state.startOpen =
                action.payload !== undefined
                    ? action.payload
                    : !state.startOpen;
        },
    },
});

export const { toggleStart } = startSlice.actions;

export default startSlice.reducer;
