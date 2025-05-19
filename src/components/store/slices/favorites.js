import { createSlice} from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: {}
  },
  reducers: {
    toggleFavorites: (state, action) => {
      const {id, poster_path, title, release_date, vote_average, vote_count, overview, isMovie} = action.payload;
      if(state.movies[id])
        delete state.movies[id];
      else
        state.movies[id] = {poster_path, title, release_date, vote_average, vote_count, overview, isMovie};
    },
  }
});
export const {toggleFavorites} = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;