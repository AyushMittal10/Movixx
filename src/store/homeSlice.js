import { createSlice } from '@reduxjs/toolkit'

// create slice ka instance bnaya
export const homeSlice = createSlice({
  name: "home",
  // states of url (path jo rhenge) and genre ki
  initialState: {
    url: {},
    genres: {},
  },
  // yha method honge humare (ye 2 upar url and genre ke)
  // state -- initial vli hoti hai, action -- vo hoga jo hum pss krenge use krte time
  // data milega -- and new url and new genre value milegi

  // create slice meh action hai -- uss meh ye sab action hai jo export kra diya
  reducers: {
    getApiConfiguration:  (state, action) => {
        state.url = action.payload;
    },
    getGenres:  (state, action) => {
        state.genres = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer