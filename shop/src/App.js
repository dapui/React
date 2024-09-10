import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import getImg from './img/woman.jpg';

function App() {
    return (
        <div className="App">
            {/*<Button variant="primary">Primary</Button>*/}
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
                    <Col>
                        <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%"/>
                        <h4>상품명</h4>
                        <p>상품설명</p>
                    </Col>
                    <Col>
                        <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%"/>
                        <h4>상품명</h4>
                        <p>상품설명</p>
                    </Col>
                    <Col>
                        <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%"/>
                        <h4>상품명</h4>
                        <p>상품설명</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
