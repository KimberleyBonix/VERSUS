import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProfileGamesState } from '../../@types';

const initialState: ProfileGamesState = {
  games: [],
  error: null,
  isSuccess: false,
};

export const profileGames = createAsyncThunk(
  'profileGames',
  async ({ games, userId }: { games: number[]; userId: number | null }) => {
    const { data } = await axios.patch(
      `http://localhost:3000/user/${userId}`,
      games
    );

    return data;
  }
);

const profileGamesSlice = createSlice({
  name: 'profileGames',
  initialState,
  reducers: {
    changeSelectedGames(
      state,
      action: PayloadAction<{
        value: number[];
      }>
    ) {
      const { value } = action.payload;

      state.games = value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(profileGames.pending, (state) => {
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(profileGames.rejected, (state) => {
        state.error = 'Jeux rejetés';
        state.isSuccess = false;
      })
      .addCase(profileGames.fulfilled, (state) => {
        state.error = null;
        state.isSuccess = true;
      });
  },
});

export const { changeSelectedGames } = profileGamesSlice.actions;
export default profileGamesSlice.reducer;