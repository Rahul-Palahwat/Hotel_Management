import { createSlice , createAsyncThunk, current } from "@reduxjs/toolkit";

import { STATUS } from "../../../utils/constant";

const API = ''

const initialState = {
    getAllBookings: STATUS.NOT_STARTED,
    dataAllProducts : [],
}


export const getTotalItems = createAsyncThunk ( 'get/allProducts' , async(payload: {} , thunkAPI) => {
    const response = await API.get('/all' , payload)
    let {ok , data , problem} = response
    if(ok) {
        console.log(data,"Data from localhost")
        return data
    } else {
        return thunkAPI.rejectWithValue(problem)
    }
} )