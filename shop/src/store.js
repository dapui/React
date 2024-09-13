import {configureStore, createSlice} from '@reduxjs/toolkit'
import user from './store/userSclice.js'




let cart = createSlice({
    name: "cart",
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        addCount(state, action){
            let num = state.findIndex((index)=>{ return index.id === action.payload})
            state[num].count++;
        },
        addItem(state, action){
            state.findIndex((index)=>{
                // return index.id === action.payload
                if (index.id === action.payload.id){
                    alert('이미 장바구니에 추가된 상품입니다.');
                    return;
                }
            })
            state.push(action.payload);
        },
        deleteItem(state, action){
            let num = state.findIndex((index)=>{ return index.id === action.payload})
            state.splice(num, 1);
        }
    }
})

export let {addCount, addItem, deleteItem} = cart.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer
    }
})