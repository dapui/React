import {createContext, useEffect, useState} from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import getImg from './img/woman.jpg';
import './App.css';
import data from './data.js';
import Detail from './routes/Detail.js';
import Cart from './routes/Cart.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from "axios";
import {useQuery} from "react-query";

export let Context1 = createContext();

function App() {
    let [shoes, setShoes] = useState(data);
    let navigate = useNavigate();
    let [count, setCount] = useState(2);
    let [loading, setLoading] = useState(false);
    let [stock, setStock] = useState([10, 11, 12]);

    // localStorage
    // let obj = {name : 'dapui'}
    // localStorage.setItem('data', JSON.stringify(obj));
    // let outObj = localStorage.getItem('data');
    // console.log(JSON.parse(outObj).name);
    useEffect(()=>{
        let watchedList = localStorage.getItem('watched');
        watchedList= JSON.parse(watchedList);
        if (watchedList == '' || watchedList == null) {
            localStorage.setItem('watched', JSON.stringify([]));
        }
    }, [])

    // react-query : 실시간 데이터 가져올 때 사용 (ex. sns, 코인 등)
    let getUserName = useQuery('작명', ()=>
        axios.get('https://codingapple1.github.io/userdata.json')
            .then((a)=>{
                console.log('요청됨');
                return a.data
            }),
        {staleTime : 2000}  // refetch 간격 설정 (timer)
    )

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Dapui Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/about') }}>about</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/event') }}>event</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/cart') }}>cart</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto" style={{color : 'white'}}>
                        {/*{ getUserName.isLoading ? 'Loding...' : getUserName.data.name }*/}
                        { getUserName.isLoading && 'Loding...' }
                        { getUserName.error && 'Error' }
                        { getUserName.data && getUserName.data.name }
                    </Nav>
                </Container>
            </Navbar>

            {
                loading == true ? <div>loading...</div> : null
            }

            <Routes>
                <Route path="/" element={
                    <>
                    <div className="main-bg" style={{backgroundImage : 'url(' + getImg + ')'}}></div>
                    <Container>
                        <Row>
                        {
                            shoes.map((data, i) => {
                                return (
                                    <Card shoes={shoes[i]} i={i} key={i}/>
                                )
                            })
                        }
                        </Row>
                    </Container>
                    <button onClick={()=>{
                        if (count == 4){
                            alert('상품이 없습니다.');
                            return;
                        }

                        setLoading(true);
                        axios.get('https://codingapple1.github.io/shop/data'+count+'.json')
                        .then((result)=>{
                            let copy = [...shoes, ...result.data];
                            setShoes(copy);
                            setLoading(false);
                            setCount(count + 1);
                        })
                        .catch(()=>{
                            setLoading(false);
                            console.log('요청 실패');
                        })
                        
                        // post 요청
                        // axios.get('/url', {name : 'kim'})
                        //     .then((result)=>{
                        //     console.log(result);
                        //         console.log('요청 성공');
                        // })
                        // .catch(()=>{
                        //     console.log('요청 실패');
                        // })

                        // 여러개를 동시에 요청하고 싶을 때
                        // Promise.all([ axios.get('/url1'), axios.get('/url2') ])
                        //     .then((result)=>{
                        //         let copy = [...shoes, ...result.data];
                        //         if (count == 4){
                        //             alert('상품이 없습니다.');
                        //         }
                        //         setShoes(copy);
                        //         setLoading(false);
                        //         setCount(count + 1);
                        //     })
                        //     .catch(()=>{
                        //         setLoading(false);
                        //         console.log('요청 실패');
                        //     })

                        // fetch 사용의 경우
                        // fetch('https://codingapple1.github.io/shop/data2.json')
                        //     .then(result => result.json())
                        //     .then(result => {
                        //         let copy = [...shoes, ...result];
                        //         setShoes(copy);
                        //         setLoading(false);
                        //     })
                        //     .catch(()=>{
                        //         setLoading(false);
                        //         console.log('요청 실패');
                        //     })

                    }}>버튼</button>
                    </>
                } />
                <Route path="/datail/:id" element={
                    <Context1.Provider value={{ stock }}>
                        <Detail shoes={shoes}/>
                    </Context1.Provider>
                } />
                <Route path="/about" element={<About/>}>
                    <Route path="member" element={<div>멤버</div>} />
                    <Route path="location" element={<div>위치정보</div>} />
                </Route>
                <Route path="/event" element={<Event/>}>
                    <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
                    <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
                </Route>
                <Route path="/cart" element={<Cart/>} />
                <Route path="*" element={<div>없는 페이지입니다</div>} />
            </Routes>

            <WatchedItem shoes={shoes}/>
        </div>
    );
}

function WatchedItem(shoes) {
    let watchedList = localStorage.getItem('watched');
    watchedList= JSON.parse(watchedList);

    return (
        <>
            <p>최근에 본 상품</p>
            {
                watchedList.map((item, i) => (
                    <div key={i}>{item}</div>
                ))
            }
        </>
    )
}

function Event() {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet />
        </div>
    )
}

function About() {
    return (
        <div>
            <h4>회사 정보</h4>
            <Outlet />
        </div>
    )
}

function Card(props) {
    let navigate = useNavigate();

    return (
        <Col>
            <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="80%" onClick={()=>{ navigate('/datail/' + props.i) }} shoes={props.shoes}/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </Col>
    )
}

export default App;
