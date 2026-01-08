import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  birthDate: string;
  address: {
    address: string;
  };
  image: string;
  gender: string;
  company: {
    name: string;
  };
  phone: string;
}

interface User {
  users: UserDetails[];
  skip: number;
  fullDetails: UserDetails | null;
}

const initialState: User = {
  users: [],
  skip: 0,
  fullDetails: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<UserDetails[]>) => {
      state.users = action.payload;
    },

    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },

    getSingleUserPage: (state, action: PayloadAction<number>) => {
      const findUser = state.users.find((user) => user.id === action.payload);

      if (findUser) {
        state.fullDetails = findUser || null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserData, setSkip, getSingleUserPage } = usersSlice.actions;

export default usersSlice.reducer;
