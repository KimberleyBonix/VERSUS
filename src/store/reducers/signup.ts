import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SignupState, SignupCredentials } from '../../@types';

const initialState: SignupState = {
  credentials: {
    email: '',
    password: '',
    confirmation: '',
  },
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const signup = createAsyncThunk(
  'signup',
  async (credentials: SignupCredentials) => {
    const { data } = await axios.post(
      'http://localhost:3000/signup',
      credentials
    );

    return data;
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    changeInputSignupValue(
      state,
      action: PayloadAction<{
        fieldName: keyof SignupState['credentials'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;
      state.credentials[fieldName] = value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
      });
  },
});

export const { changeInputSignupValue } = signupSlice.actions;
export default signupSlice.reducer;