import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Views } from "../domain/views"

export interface ViewSlice {
  current: Views
  showSettings: bool
}

const initialState: ViewSlice = {
  current: Views.MainFileSelector,
  showSettings: false
}

export const viewSlice = createSlice({
  name: "view",
  initialState: initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<Views>) => {
      state.current = action.payload
    }
  }
})

export const { setCurrentView } = viewSlice.actions

export const viewReducer = viewSlice.reducer
