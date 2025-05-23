import { createSlice} from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: {}
  },
  reducers: {
    toggleFavorites: (state, action) => {
      const {id, ...movieData} = action.payload;
      if(state.movies[id])
        delete state.movies[id];
      else
        state.movies[id] = movieData;
    },
    loadFavorites: (state, action) => {
      state.movies = action.payload || {};
    }
  }
});
export const {toggleFavorites, loadFavorites} = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;