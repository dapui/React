import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: { name : "oh", age : 20},
    reducers: {
        changeName(state) {
            state.name = " dapui";
        },
        increaseAge(state, num) {
            state.age += num.payload;
        }
    }
})

export let {changeName, increaseAge} = user.actions

export default user