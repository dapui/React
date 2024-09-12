import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";

let YellowBtn = styled.button`
    background : ${ props => props.bg};
    color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`
let NewBtn = styled(YellowBtn)`
  border: none;
`

function Detail(props) {
    let {id} = useParams();
    let [count, setCount] = useState(0);
    let [discount, setDiscount] = useState(true);
    let [num, setNum] = useState('');

    useEffect(() => {
        let a = setTimeout(()=>{setDiscount(false)}, 2000)

        // 기존 작업 제거 (useEffect 실행 전 동작 -> cleanup function)
        return () => {
            clearTimeout(a);
        }
    }, []);

    useEffect(()=>{
        if (isNaN(num) == true){
            alert('숫자를 입력하세요');
        }
    }, [num])

    let findItem = props.shoes.find(function(x){
        return x.id == id
    });

    return (
        <div className="container">
            {
                discount == true
                ? <div className="alert alert-warning">
                        2초 이내 구매시 할인
                  </div>
                : null
            }

            <YellowBtn bg="orange">버튼</YellowBtn>
            <YellowBtn bg="blue">버튼</YellowBtn>
            <NewBtn bg="pink" onClick={()=>{setCount(count + 1)}}>{count}</NewBtn>

            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (findItem.id+1) + '.jpg'} width="100%"/>
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{findItem.title}</h4>
                    <p>{findItem.content}</p>
                    <p>{findItem.price}원</p>
                    <input onChange={ (e) => { setNum(e.target.value) } } />
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;