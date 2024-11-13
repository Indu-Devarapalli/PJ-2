import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../api';

const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// login
export const login = createAsyncThunk('auth/login', async (params, thunkApi) => {
  console.log('🚀 ~ file: AuthSlice.js:12 ~ login ~ params:', params);
  try {
    const response = await API.post('auth/login', params);
    console.log('🚀 ~ file: AuthSlice.js:16 ~ login ~ response:', response);
    return response.data; // Success
  } catch (error) {
    if (error.response) {
      // Log the detailed error response
      console.log('🚀 ~ error.response:', error.response);  // Log full error response
      return thunkApi.rejectWithValue(error.response.data); // Return response data
    } else if (error.request) {
      // Network error or no response
      console.log('🚀 ~ error.request:', error.request);
      return thunkApi.rejectWithValue({ message: 'Network error or no response from server.' });
    } else {
      console.log('🚀 ~ error:', error);
      return thunkApi.rejectWithValue({ message: 'Unexpected error occurred.' });
    }
  }
});


// signup

// confirmSignup

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // login cases
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default AuthSlice.reducer;
