import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import { logInsert } from "./reportSlice"
export const getBooks = createAsyncThunk('book/getBooks',async (_, thunkAPI)=>{
    const {rejectWithValue } = thunkAPI
    try {
        const res = await fetch('http://localhost:3004/books')
        const data = await res.json()
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const  insertBook = createAsyncThunk('book/insertBook', async (bookdata, thunkAPI)=>{
    const {rejectWithValue , getState, dispatch} = thunkAPI
    try {
        bookdata.userName = getState().auth.name
        const res = await fetch('http://localhost:3004/books', {
            method: 'POST',
            body: JSON.stringify(bookdata),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        const data = await res.json()
        dispatch(logInsert({name: 'inserBook', status : 'success'}))
        return data
     } catch (error) {
        dispatch(logInsert({name: 'inserBook', status : 'failed'}))
        return rejectWithValue(error.message)
    }
})

export const deleteBook = createAsyncThunk('book/deleteBook', async(id , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try {
        await fetch(`http://localhost:3004/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })

        
        return id
     } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const getBookInfo = createAsyncThunk('book/getBookInfo', async(item , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try {
        await fetch(`http://localhost:3004/books/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        return item
     } catch (error) {
        return rejectWithValue(error.message)
    }
})
const bookSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        isLoading: false, 
        error: null,
        bookInfo: null
    },
    reducers: {

    },
    extraReducers: {
        [getBooks.pending]: (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books = action.payload

        },
        [getBooks.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        [insertBook.pending]: (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [insertBook.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books.push(action.payload)
        },
        [insertBook.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        [deleteBook.pending]: (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books = state.books.filter(book => book.id !== action.payload)
            console.log(action.payload);
            
        },
        [deleteBook.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },


        [getBookInfo.fulfilled]: (state, action) => {
            state.isLoading = false
            state.bookInfo = action.payload
            
        },

        }
})


export default bookSlice.reducer