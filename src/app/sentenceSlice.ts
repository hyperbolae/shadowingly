import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Sentence } from "../domain/sentence"

export interface SentenceSlice {
  current?: Sentence
}

const initialState: SentenceSlice = {}

export const sentenceSlice = createSlice({
  name: "sentence",
  initialState: initialState,
  reducers: {
    setSentence: (state, action: PayloadAction<Sentence>) => {
      state.current = action.payload
    }
  }
})

export const { setSentence } = sentenceSlice.actions

export const sentenceReducer = sentenceSlice.reducer
