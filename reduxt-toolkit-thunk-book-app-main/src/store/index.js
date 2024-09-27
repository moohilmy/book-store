import { configureStore } from "@reduxjs/toolkit";
import books from './bookSlice'
import auth from "./authSlice";
import report from "./reportSlice"
export default configureStore({
    reducer: {
        // Define your reducer here
        books,
        auth,
        report
    }
})