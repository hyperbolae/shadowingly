import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SettingsState {
  showSettings: bool
  interfaceLanguage: string
}

function hydrateStateFromLocalStorage(): SettingsState {
  return {
    showSettings: window.localStorage.getItem("settings:showSettings") || false,
    interfaceLanguage: window.localStorage.getItem("settings:interfaceLanguage") || "en"
  }
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: hydrateStateFromLocalStorage(),
  reducers: {
    setShowSettings: (state, action: PayloadAction<bool>) => {
      state.showSettings = action.payload
    },
    setInterfaceLanguage: (state, action: PayloadAction<string>) => {
      state.interfaceLanguage = action.payload
      window.localStorage.setItem("settings:interfaceLanguage", action.payload)
    }
  }
})

export const { setShowSettings, setInterfaceLanguage } = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
