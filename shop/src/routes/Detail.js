import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import { Nav } from 'react-bootstrap';
import { addItem } from './../store.js';
import { useDispatch } from 'react-redux';

import { Context1 } from './../App.js';

let YellowBtn = styled.button`
    background : ${ props => props.bg};
    color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`
let NewBtn = styled(YellowBtn)`
  border: none;
`

function Detail(props) {
    let {stock} = useContext(Context1);

    let {id} = useParams();
    let [count, setCount] = useState(0);
    let [discount, setDiscount] = useState(true);
    let [num, setNum] = useState('');
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('');
    let dispatch = useDispatch();

    useEffect(() => {
        let a = setTimeout(()=>{setDiscount(false)}, 2000)
        setFade2('end');

        // 기존 작업 제거 (useEffect 실행 전 동작 -> cleanup function)
        return () => {
            clearTimeout(a);
            setFade2('');
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
        <div className={'container start ' + fade2}>
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
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem({id : findItem.id, name : findItem.title, count : 1}));
                    }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{ setTab(0) }}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{ setTab(1) }}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{ setTab(2) }}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>


        </div>
    )
}

function TabContent({tab}) {
    // if (tab == 0) {
    //     return <div>내용0</div>
    // } else if (tab == 1) {
    //     return <div>내용1</div>
    // } else if (tab == 2) {
    //     return <div>내용2</div>
    // }

    let [fade, setFade] = useState('');
    let {stock} = useContext(Context1);

    useEffect(()=>{
        let a = setTimeout(()=>{ setFade('end') }, 100)

        return () => {
            clearTimeout(a);
            setFade('');
        }
    }, [tab])

    return (
     //<div className={'start' + fade}>
     <div className={`start ${fade}`}>
         { [<div>{stock}</div>, <div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
     </div>
    )
}

export default Detail;