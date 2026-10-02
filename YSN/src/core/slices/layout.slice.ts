import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ══════════════════════════════════════════════════════════════════
// LAYOUT SLICE
// Manages runtime layout state (sidebar collapse, mobile overlay).
// Sidebar variant & layout mode are template-time choices — they
// are configured by uncommenting imports in:
//   • src/assets/scss/app.scss        (SCSS variant)
//   • src/layout/SidebarWrapper.tsx   (sidebar component)
//   • src/routes/AllRoutes.tsx         (layout component)
// ══════════════════════════════════════════════════════════════════

interface LayoutState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
}

const initialState: LayoutState = {
  sidebarCollapsed:
    localStorage.getItem("sidebarCollapsed") === "true" || false,
  sidebarMobileOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem(
        "sidebarCollapsed",
        String(state.sidebarCollapsed)
      );
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      localStorage.setItem("sidebarCollapsed", String(action.payload));
    },
    toggleSidebarMobile: (state) => {
      state.sidebarMobileOpen = !state.sidebarMobileOpen;
    },
    setSidebarMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarMobileOpen = action.payload;
    },
  },
});

export const {
  toggleSidebarCollapsed,
  setSidebarCollapsed,
  toggleSidebarMobile,
  setSidebarMobileOpen,
} = layoutSlice.actions;
export default layoutSlice.reducer;
