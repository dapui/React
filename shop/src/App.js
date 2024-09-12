import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import getImg from './img/woman.jpg';
import './App.css';
import data from './data.js';
import Detail from './routes/Detail.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

function App() {

    let [shoes] = useState(data);
    let navigate = useNavigate();

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Dapui Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/datail') }}>detail</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/about') }}>about</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={
                    <>
                    <div className="main-bg" style={{backgroundImage : 'url(' + getImg + ')'}}></div>
                    <Container>
                        <Row>
                            {
                                shoes.map((data, i) => {
                                return (
                                <Card shoes={shoes[i]} i={i}/>
                            )
                            })
                            }
                        </Row>
                    </Container>
                    </>
                } />
                <Route path="/datail/:id" element={<Detail shoes={shoes}/>} />
                <Route path="/about" element={<About/>}>
                    <Route path="member" element={<div>멤버</div>} />
                    <Route path="location" element={<div>위치정보</div>} />
                </Route>
                <Route path="/event" element={<Event/>}>
                    <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
                    <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
                </Route>
                <Route path="*" element={<div>없는 페이지입니다</div>} />
            </Routes>

        </div>
    );
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
    return (
        <Col>
            <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="80%"/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </Col>
    )
}

export default App;
