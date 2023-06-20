import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api from "../../webApi/Home/api";

export const fetchTopMakeup=createAsyncThunk("topMakeupSlice/fetchTopMehandi",async()=>{
    let response =await axios.get(baseUrl.BASE_URl+api.TOPMAKEUP_LIST)
    console.log(response.data)
     return response.data
});

const slice= createSlice({
    name:"topMakeup",
    initialState:{
        topMakeupList: [],
        isLoading: false,
        error: null
    },
    extraReducers:(builder)=> {
       builder.addCase(fetchTopMakeup.pending,(state,action)=>{
          state.isLoading=true;
       }).addCase(fetchTopMakeup.fulfilled,(state,action)=>{
        state.topMakeupList = action.payload.makeupDetails;
        state.isLoading = false;
    }).addCase(fetchTopMakeup.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = "something went wrong";
    })
    }
})

export default slice.reducer;