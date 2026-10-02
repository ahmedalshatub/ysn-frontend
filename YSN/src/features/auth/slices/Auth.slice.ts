import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CurrentUserDto, LoginResponseDto } from "../types/Auth.types";

interface AuthState {
  isLoggedIn: boolean;
  userId: number;
  userName: string;
  email: string | null;
  firstName: string;
  lastName: string;
  roleId: number | null;
  roleName: string | null;
  isSuperAdmin: boolean;
  permissions: string[];
  hasAllCities: boolean;
  cityIds: number[];
  jwtToken: string | null;
  refreshToken: string | null;
  profileImageUrl: string | null;
  forcePasswordChange: boolean;
}

const emptyState: AuthState = {
  isLoggedIn: false,
  userId: 0,
  userName: "",
  email: null,
  firstName: "",
  lastName: "",
  roleId: null,
  roleName: null,
  isSuperAdmin: false,
  permissions: [],
  hasAllCities: false,
  cityIds: [],
  jwtToken: null,
  refreshToken: null,
  profileImageUrl: null,
  forcePasswordChange: false,
};

const loadFromLocalStorage = (): AuthState => {
  const serializedState = localStorage.getItem("authState");
  if (serializedState === null) return emptyState;
  return { ...emptyState, ...JSON.parse(serializedState) };
};

const saveToLocalStorage = (state: AuthState) => {
  localStorage.setItem("authState", JSON.stringify(state));
};

const applyUser = (state: AuthState, user: CurrentUserDto) => {
  state.userId = user.id;
  state.userName = user.userName;
  state.email = user.email;
  state.firstName = user.firstName;
  state.lastName = user.lastName;
  state.roleId = user.roleId;
  state.roleName = user.roleName;
  state.isSuperAdmin = user.isSuperAdmin;
  state.permissions = user.permissions ?? [];
  state.hasAllCities = user.hasAllCities;
  state.cityIds = user.cityIds ?? [];
  state.profileImageUrl = user.profileImage || null;
  state.forcePasswordChange = user.forcePasswordChange;
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadFromLocalStorage(),
  reducers: {
    login: (state, action: PayloadAction<LoginResponseDto>) => {
      applyUser(state, action.payload);
      state.isLoggedIn = true;
      state.jwtToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      saveToLocalStorage(state);
    },
    setCurrentUser: (state, action: PayloadAction<CurrentUserDto>) => {
      applyUser(state, action.payload);
      saveToLocalStorage(state);
    },
    clearForcePasswordChange: (state) => {
      state.forcePasswordChange = false;
      saveToLocalStorage(state);
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.jwtToken = action.payload.accessToken || action.payload.jwtToken;
      state.refreshToken = action.payload.refreshToken;
      if (state.jwtToken && state.refreshToken) state.isLoggedIn = true;
      if (Array.isArray(action.payload.permissions)) applyUser(state, action.payload);
      saveToLocalStorage(state);
    },
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImageUrl = action.payload;
      saveToLocalStorage(state);
    },
    logout: () => {
      localStorage.removeItem("authState");
      return emptyState;
    },
  },
});

export const { login, logout, setToken, setCurrentUser, setProfileImage, clearForcePasswordChange } = authSlice.actions;
export default authSlice.reducer;
