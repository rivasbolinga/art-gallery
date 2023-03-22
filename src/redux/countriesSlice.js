import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectSelectedContinent } from './modalSlice'

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await fetch(
      'https://restcountries.com/v3.1/all'
    )
    const data = await response.json();
    return data
  }
)


const countriesSlice = createSlice({
  name: 'countries',
  initialState: { countries: [] },
  reducers: {
    filter: (state, action) => {
      const selectedContinent = selectSelectedContinent(state)
      return {
        ...state,
        countries: state.countries.filter((country) =>
          country.continents.includes(selectedContinent)
        ),
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload
    })
  },
})

export const selectCountries = (state) => state.countries;
export default countriesSlice.reducer;
export const { filter } = countriesSlice.actions;