/* eslint-disable */

import './App.css';
import {useState} from 'react';

function App() {

    let logo = 'ReactBlog';
    let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
    let [issueDate, setIssueDate] = useState(['2024-09-01', '2024-09-04', '2024-09-05']);
    let [count, setCount] = useState([0, 0, 0]);
    let [modal, setModal] = useState(false);
    let [titleNum, setTitleNum] = useState(0);
    let [inputValue, setInputValue] = useState('');

    return (
        <div className="App">
            <div className="black-nav">
                <h4>{logo}</h4>
            </div>

            <button onClick={() => {
                let copy = [...title];
                copy.sort();
                setTitle(copy);
            }}>정렬버튼
            </button>

            <button onClick={() => {
                let copy = [...title];
                copy[0] = '여자 코트 추천';
                setTitle(copy);
            }}>글 수정
            </button>

            {
                title.map(function (data, i) {
                    return (
                        <div className="list" key={i}>
                            <h4 onClick={() => {
                                setModal(!modal);
                                setTitleNum(i)
                            }}>
                                {data}
                                <span onClick={(e) => {
                                    e.stopPropagation();
                                    let copy = [...count];
                                    copy[i] = copy[i] + 1;
                                    setCount(copy);
                                }}>👍</span> {count[i]}
                            </h4>
                            <IssueDate issueDate={issueDate[i]}/>
                            <button onClick={() => {
                                let copyTitle = [...title];
                                copyTitle.splice(i, 1);
                                setTitle(copyTitle);
                                let copyCount = [...count];
                                copyCount.splice(i, 1);
                                setCount(copyCount);
                                let copyIssueDate = [...issueDate];
                                copyIssueDate.splice(i, 1);
                                setIssueDate(copyIssueDate);
                            }}>삭제</button>
                        </div>
                    )
                })
            }

            <div>
                <input onChange={(e) => {setInputValue(e.target.value)}}/>
                <button onClick={() => {
                    let copyTitle = [...title];
                    copyTitle.unshift(inputValue);
                    {
                        inputValue === '' ? alert('제목을 입력하세요.') : setTitle(copyTitle);
                    }
                    let copyCount = [...count];
                    copyCount.unshift(0);
                    setCount(copyCount);
                    let copyIssueDate = [...issueDate];
                    copyIssueDate.unshift(<Today/>);
                    setIssueDate(copyIssueDate);
                }}>글발행</button>
            </div>

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
            }}>글 수정
            </button>
        </div>
    )
}

let IssueDate = (props) => {
    return (
        <p>{props.issueDate}</p>
    )
}

let Today = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let date = today.getDate().toString().padStart(2, '0');

    return (
        year + '-' + month + '-' + date
    )
}

export default App;
