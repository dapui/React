import {useParams} from "react-router-dom";
import styled from "styled-components";

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
    let findItem = props.shoes.find(function(x){
        return x.id == id
    });

    return (
        <div className="container">
            <YellowBtn bg="orange">버튼</YellowBtn>
            <YellowBtn bg="blue">버튼</YellowBtn>
            <NewBtn bg="pink">버튼</NewBtn>

            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (findItem.id+1) + '.jpg'} width="100%"/>
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{findItem.title}</h4>
                    <p>{findItem.content}</p>
                    <p>{findItem.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;