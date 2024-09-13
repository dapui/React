import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changeName, increaseAge} from "./../store/userSclice";
import {addCount, deleteItem} from "./../store.js";

function Cart() {

    // let a = useSelector((state)=>{ return state.stock })
    let state = useSelector((state)=> state)     // {}, return 생략가능
    let dispatch = useDispatch()

    return (
        <div>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={()=>{  dispatch(increaseAge(100))}}>버튼</button>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.cart.map((data, i) =>
                        <Item cart={state.cart[i]} i={i} key={i}/>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

function Item({cart, i}) {
    let dispatch = useDispatch()

    return (
        <>
        <tr>
            <td>{cart.id}</td>
            <td>{cart.name}</td>
            <td>{cart.count}</td>
            <td><button onClick={()=>{
                dispatch(addCount(cart.id));
            }}>+</button></td>
            <td><button onClick={()=>{
                dispatch(deleteItem(cart.id));
            }}>삭제</button></td>
        </tr>
        </>
    )
}

export default Cart;