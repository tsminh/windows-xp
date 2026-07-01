import type { RootState } from "@/store";

export const selectIsStartOpen = (state: RootState) => state.start.startOpen;
