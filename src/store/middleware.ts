import { createListenerMiddleware } from "@reduxjs/toolkit";
import { bringToFront, openWindow } from "./windowSlice";
import { toggleStart } from "./startSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: bringToFront,
    effect: async (_, api) => {
        api.dispatch(toggleStart(false));
    },
});

listenerMiddleware.startListening({
    actionCreator: openWindow,
    effect: async (_, api) => {
        api.dispatch(toggleStart(false));
    },
});

export default listenerMiddleware;
