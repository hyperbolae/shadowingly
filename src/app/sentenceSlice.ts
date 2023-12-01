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
    },
    clearSentence: (state) => {
      state.current = undefined
    }
  }
})

export const { setSentence, clearSentence } = sentenceSlice.actions

export const sentenceReducer = sentenceSlice.reducer
