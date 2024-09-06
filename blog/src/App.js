/* eslint-disable */

import './App.css';
import { useState } from 'react';

function App() {

  let logo = 'ReactBlog';
  let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [count, setCount] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [titleNum, setTitleNum] = useState(0);
  
  return (
    <div className="App">
      <div className="black-nav">
        <h4>{logo}</h4>
      </div>

      <button onClick={()=>{ 
        let copy = [...title];
        copy.sort();
        setTitle(copy);
      }}>정렬버튼</button>

      <button onClick={() => {
        let copy = [...title];
        copy[0] = '여자 코트 추천';
        setTitle(copy);
      }}>글 수정</button>

      {
        title.map(function(data, i) {
          return (
            <div className="list" key={i}>
              <h4 onClick={() => {setModal(true); setTitleNum(i)}}>
                {data}
                <span onClick={() => {
                  let copy = [...count];
                  copy[i] = copy[i] + 1;
                  setCount(copy);
                }}>👍</span> {count[i]}
              </h4>
              <p>9월 5일 발행</p>
            </div>
          )
        })
      }

      {
        modal == true ? <Modal title={title} setTitle={setTitle} titleNum={titleNum}/> : null
      }

    </div>
  );
}

let Modal = (props) => {
  return (
    <div className="modal">
      <h4>{props.title[props.titleNum]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => {
        let copy = [...props.title];
        copy[0] = '여자 코트 추천';
        props.setTitle(copy);
      }}>글 수정</button>
    </div>
  )
}

export default App;
