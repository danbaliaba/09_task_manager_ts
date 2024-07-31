import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

export interface IUser {
  id: number;
  name: string;
  company: { name: string };
  phone: string;
  email?: string;
  website?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface IUsersState {
  users: IUser[];
  status: "loading" | "success" | "error";
  idSelectedUser: number;
}

const initialState: IUsersState = {
  users: [],
  status: "loading",
  idSelectedUser: 0,
};

export const fetchUsers = createAsyncThunk<IUser[], void, { state: RootState }>(
  "users/fetchUsers",
  async () => {
    const data = (
      await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users")
    ).data;
    return data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      state.users.push(action.payload);
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((_, index) => action.payload !== index);
    },
    editUser(state, action: PayloadAction<IUser>) {
      if (
        state.users[action.payload.id].name !== action.payload.name ||
        state.users[action.payload.id].company.name !==
          action.payload.company.name ||
        state.users[action.payload.id].phone !== action.payload.phone
      ) {
        state.users = state.users.map((e, index) =>
          index === action.payload.id ? action.payload : e
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
          state.users = action.payload;
          state.status = "success";
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addUser, deleteUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;
