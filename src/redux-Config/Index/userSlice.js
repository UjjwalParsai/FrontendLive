import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 export const CurrentUser=createAsyncThunk("userSlice/CurrentUser",(customer)=>{
    return customer
 });

 const slice=createSlice({
    name:"currentUser",
    initialState:{
        currentUser: null,
        isLoading: false,
        error: null
    },
    reducers:{
   signOut:(state,action)=>{
    state.currentUser=null;
   }
    },
    extraReducers:(builder)=>{
        builder.addCase(CurrentUser.fulfilled,(state,action)=>{
          state.currentUser=action.payload
        }).addCase(CurrentUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = "something went wrong";
        }).addCase(CurrentUser.pending,(state,action)=>{
            state.isLoading=true;
         })

    }
 });

 export default slice.reducer;
 export const {signOut}=slice.actions;