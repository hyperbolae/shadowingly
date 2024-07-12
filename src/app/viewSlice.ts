import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Views } from "../domain/views"

export interface ViewSlice {
  current: Views
  show_settings: bool
}

const initialState: ViewSlice = {
  current: Views.MainFileSelector,
  show_settings: false
}

export const viewSlice = createSlice({
  name: "view",
  initialState: initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<Views>) => {
      state.current = action.payload
    },
    setShowSettings: (state, action: PayloadAction<bool>) => {
      state.show_settings = action.payload
    }
  }
})

export const { setCurrentView, setShowSettings } = viewSlice.actions

export const viewReducer = viewSlice.reducer
