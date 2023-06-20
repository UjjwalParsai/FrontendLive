import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api from "../../webApi/Home/api"


export const fetchTopPandit=createAsyncThunk("topPanditSlice/fetchTopPandit",async()=>{
    let response=await axios.get(baseUrl.BASE_URl+api.TOPPANDIT_LIST)
    return response.data;
});

const slice=createSlice({
    name:"topPandit",
    initialState:{
        topPanditList:[],
        isLoading: false,
        error: null
    },

    extraReducers:(builder)=> {
        builder.addCase(fetchTopPandit.pending,(state,action)=>{
           state.isLoading=true;
        }).addCase(fetchTopPandit.fulfilled,(state,action)=>{
         state.topPanditList = action.payload.premiumPanditList;
         state.isLoading = false;
     }).addCase(fetchTopPandit.rejected,(state,action)=>{
         state.isLoading = false;
         state.error = "something went wrong";
     })
     }

})

export default slice.reducer