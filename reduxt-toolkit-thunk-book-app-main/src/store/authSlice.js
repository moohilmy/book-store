import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        name: 'mohamed helmy'
    },
    reducers: {
        logInOut : (state) => {
            state.isLoggedIn = !state.isLoggedIn
        }
    },
    extraReducers: {},

})

export const { logInOut} = authSlice.actions
export default authSlice.reducer