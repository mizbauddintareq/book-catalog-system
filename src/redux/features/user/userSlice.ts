import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  user: {
    email: string | null;
    id: string | null;
  };
}

const initialState: IUserState = {
  user: {
    email: null,
    id: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>): void => {
      state.user.email = action.payload;
    },
    setID: (state, action: PayloadAction<string | null>): void => {
      state.user.id = action.payload;
    },
  },
});

export const { setUser, setID } = userSlice.actions;

export default userSlice.reducer;
