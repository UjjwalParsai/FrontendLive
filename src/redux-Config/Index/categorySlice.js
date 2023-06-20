 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCategory = createAsyncThunk("category/fetchCategory",async()=>{

    let response = await axios.get("http://localhost:8000/vender/category/list");
    console.log( response.data);
    return response.data;
});
const slice = createSlice({
    name: 'category',
    initialState:{
        categoryList: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchCategory.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(fetchCategory.fulfilled,(state,action)=>{
            state.categoryList = action.payload.categoryList;
            state.isLoading = false;
        }).addCase(fetchCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = "something went wrong";
        })
    }
});

export default slice.reducer;