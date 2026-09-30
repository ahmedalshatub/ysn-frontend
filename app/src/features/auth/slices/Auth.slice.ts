import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserRoleType } from '../types/Roles.types';

interface AuthState {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  roleID: number;
  role: UserRoleType | null;
  jwtToken: string | null;
  refreshToken: string | null;
  profileImageUrl: string | null;
  forcePasswordChange: boolean;
}

const loadFromLocalStorage = (): AuthState => {
  const serializedState = localStorage.getItem('authState');
  if (serializedState === null) {
    return {
      isLoggedIn: false,
      firstName: '',
      lastName: '',
      roleID: 0,
      role: null,
      jwtToken: null,
      refreshToken: null,
      profileImageUrl: null,
      forcePasswordChange: false,
    };
  }
  return JSON.parse(serializedState);
};

const saveToLocalStorage = (state: AuthState) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('authState', serializedState);
};

const initialState: AuthState = loadFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ firstName: string; lastName: string; roleID: number; jwtToken: string; refreshToken: string; profileImageUrl?: string | null; forcePasswordChange?: boolean }>) => {
      state.isLoggedIn = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.roleID = action.payload.roleID;
      state.role = action.payload.roleID as UserRoleType;
      state.jwtToken = action.payload.jwtToken;
      state.refreshToken = action.payload.refreshToken;
      state.profileImageUrl = action.payload.profileImageUrl || null;
      state.forcePasswordChange = action.payload.forcePasswordChange ?? false;
      saveToLocalStorage(state);
    },
    clearForcePasswordChange: (state) => {
      state.forcePasswordChange = false;
      saveToLocalStorage(state);
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.jwtToken = action.payload.accessToken || action.payload.jwtToken;
      state.refreshToken = action.payload.refreshToken;
      if (state.jwtToken && state.refreshToken) {
        state.isLoggedIn = true;
      }
      saveToLocalStorage(state);
    },
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImageUrl = action.payload;
      saveToLocalStorage(state);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.firstName = '';
      state.lastName = '';
      state.roleID = 0;
      state.role = null;
      state.jwtToken = null;
      state.refreshToken = null;
      state.profileImageUrl = null;
      state.forcePasswordChange = false;
      localStorage.removeItem('authState');
    },
  },
});

export const { login, logout, setToken, setProfileImage, clearForcePasswordChange } = authSlice.actions;
export default authSlice.reducer;

