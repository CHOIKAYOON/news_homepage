React를 이용해서 구현했습니다. 네이버 뉴스 검색 API를 사용해서 코로나 실시간 뉴스를 확인하는 웹 어플리케이션 입니다.
-------
![d](https://user-images.githubusercontent.com/31337244/87025590-9352cb80-c215-11ea-88cb-d648ca48a1bf.JPG)


컴포넌트 구조
* Components
  * NewsTemplate.js ( 외부 API를 뿌려주는 페이지 및 기본 html 기본 틀)
  * NewsTemplate.scss 
* Containers
  * NewsContainer.js (외부 API를 Components에 연결해주는 페이지)
* lib
  * api.js (네이버 검색 외부 API 호출 함수 구현)
* App.js (외무 API를 State에 넣어서 상태값 설정)
* server
  * servert.js (cors 보안상의 문제로 외부 API를 호출할 수 있게 해주는 서버 구현)
------

#### Components/NewsTemplate.js

``` import React, { Component } from 'react';
import style from './NewsTemplate.scss';
import className from 'classnames';

const ex = className.bind(style);

class NewsList extends Component {
    render() {
        return (
            <div className={ex('NewsContent')}>
                <div className={ex('NewsTitle')}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRd3WveWO6Tr6tXKOGC-0YZC-o0-JQHmMRUQ&usqp=CAU" />
                    <h3>코로나 실시간 뉴스 상황</h3>
                </div>
                <div className={ex('NewList')}>
                //props로 받아온 값을 map을 통해 구현. 
                    {this.props.selecteItems.map((item, ind) => (
                        <div className={ex('NewsItem')} key={ind}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgluiY1ONk7_W7wbjOahGd1_gyQo8kiOHS7A&usqp=CAU"/>
                            <div className={ex('NewsItem-title')}>
                                <h3>{item.title}</h3>
                               <span>{item.pubDate}</span>
                                <div className={ex('NewsItem-description')}>
                                    <p>{item.description}</p>
                                </div>
                                <div className={ex('NewsItem-originallink')}>
                                    <h4>제공 언론사</h4>
                                    <a href ={item.originallink}>{item.originallink}</a>
                                </div>
                                <div className={ex('NewsItem-link')}>
                                    <h4>제공 네이버</h4>
                                    <a href ={item.link}>{item.link}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default NewsList;
```
-------

#### Components/NewsTemplate.scss
```
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;


.NewsContent{
    .NewsTitle{
        font-size: 50px;
        display: flex;
        background-color: navy;
        color: white;
        img{
            width: 150px;
            height: 150px;
            border-radius: 100%;
            margin: 30px 30px 20px;
        }
    }
    
    .NewList{        
        .NewsItem{
            margin: 60px 0px;
                img{
                    float: left;
                    width: 270px;
                    height: 290px;
                    margin: 0 25px 40px 20px;
                    border-radius: 10%;
                }
        .NewsItem-title{
            font-size: 23px;
            margin: 15px 0px 40px;
                span{
                    font-size: 15px;
                }
                .NewsItem-description{
                    font-size: 20px;
                }    
                .NewsItem-originallink{
                    h4{
                        font-size: 20px;
                        margin: auto;
                    }
                    a{
                        font-size: 20px;
                    }
                }
                .NewsItem-link{
                    h4{
                        font-size: 20px;
                        margin: auto;
                    }
                    a{
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
```
-----

#### containers/NewsContainer.js
```
import React,{ Component } from 'react';
import NewsList from '../components/NewsTemplate';

class NewsContainer extends Component{
    render(){
        return(
            <div>
                <NewsList selecteItems = {this.props.selecteItems} />
            </div>
        )
    }
}

export default NewsContainer
```
--------
#### App.js
```
import React, { Component } from 'react';
import style from './App.scss';
import className from 'classnames';
import * as api from '../src/lib/api';
import NewsContainer from '../src/containers/NewsContainer'

//Sass사용을 위해 classname에 파일을 묶어서 변수 선언
const ex = className.bind(style);

class App extends Component {
  constructor(props) {
    super(props);
    
    //state 초기값 설정
    this.state = {
      selecteItems : [] 
    };
  }

//React 렌더링 시 외부 API 함수 호출 하도록 선언.
  componentDidMount() {
    api.getApi()
    //받아온 값을 state 초기 상태에 선언
    .then(res =>this.setState({
      selecteItems : res.data.items
    }))
  }

  
  render() {
    return (
      <div className={ex('content')}>
      //받아온 상태값 컨테이너 파일에 전달
          <NewsContainer selecteItems = {this.state.selecteItems}/>
      </div>
    )
  }
}

export default App;
```

----

#### lib/api.js
```
import axios from "axios";

export const getApi = async () => {
    try {
    //cors 상황 때문에 외부 API 호출하는 node/server를 하나 더 만들어서 2개의 서버를 돌아가게끔 호출했다.
    //외부 서버 실행 시 가져온 값을 나의 로컬 페이지로 보내줘서 값을 호출하는 방식으로 구현했다. 
        return await axios.get('http://localhost:3001/search')
    } catch (error) {
        console.log(error)
    }
}
```
-------
#### server/server.js
```
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const axios = require('axios');
//네이버에 받은 API 정보 변수 지정
const ID_KEY = '보안상 키값은 비공개';
const SECRET_KEY = '보안상 키값은 비공개';


//검색 값 필수이므로 변수에 값 저장
const query_data = "코로나";

//외부 서버 port 3001  
//Web Server 3000

//보안 문제로 node 서버를 따로 만들었다. cors 라이브러리를 사용해서 외부 값도 받을 수 있도록 설정
//서버를 실행 시 네이버 API를 호출하도록 선언
app.use(cors());
app.use(bodyParser.json());

//검색 할 수 있게 외부 url 명령어를 search로 설정
app.use('/search', (req, res) => {
    const word = query_data;
    axios.get("https://openapi.naver.com/v1/search/news.json",
        {
            params: { query: word, display: 20 },
            headers: {
                'X-Naver-Client-Id': ID_KEY,
                'X-Naver-Client-Secret': SECRET_KEY,
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            const items = response.data.items;
            res.send({ items: items });
        }).catch(function (error) {
            console.log(error);
        });
});
app.listen(port, () => {
    console.log(`express is running on ${port}`);
}
)

```
-------



