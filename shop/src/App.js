import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import getImg from './img/woman.jpg';
import './App.css';
import data from './data.js';

function App() {

    let [shoes] = useState(data);

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Dapui Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">New</Nav.Link>
                        <Nav.Link href="#pricing">Best</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

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
        </div>
    );
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
