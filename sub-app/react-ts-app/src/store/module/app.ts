import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    theme: string;
}

const initialState: AppState = {
    theme: "#1890ff",
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      updateTheme: (state,action: PayloadAction<AppState['theme']>) => {
        state.theme =action.payload;
      },
    },
});

export const appActions = slice.actions;
export const appReducer = slice.reducer;