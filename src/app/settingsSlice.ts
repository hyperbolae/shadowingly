import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DefaultLanguage } from "../domain/languages"

export interface SettingsState {
  showSettings: bool
  interfaceLanguage: string
}

function hydrateStateFromLocalStorage(): SettingsState {
  return {
    showSettings: window.localStorage.getItem("settings:showSettings") || false,
    interfaceLanguage: window.localStorage.getItem("settings:interfaceLanguage") || "en",
    tatoebaLanguage: window.localStorage.getItem("settings:tatoebaLanguage") || DefaultLanguage.code
  }
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: hydrateStateFromLocalStorage(),
  reducers: {
    setShowSettings: (state, action: PayloadAction) => {
      state.showSettings = action.payload
    },
    setInterfaceLanguage: (state, action: PayloadAction) => {
      state.interfaceLanguage = action.payload
      window.localStorage.setItem("settings:interfaceLanguage", action.payload)
    },
    setTatoebaLanguage: (state, action: PayloadAction) => {
      state.tatoebaLanguage = action.payload
      window.localStorage.setItem("settings:tatoebaLanguage", action.payload)
    }
  }
})

export const { setShowSettings, setInterfaceLanguage, setTatoebaLanguage } = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
