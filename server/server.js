const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const axios = require('axios');
//네이버에 받은 API 정보 변수 지정

//검색 값 필수이므로 변수에 값 저장
const query_data = "코로나";

//외부 서버 port 3001  
//Web Server 3000

//보안 문제로 node 서버를 따로 만들었다. cors 라이브러리를 사용해서 외부 값도 받을 수 있도록 설정
//서버를 실행 시 네이버 API를 호출하도록 선언
app.use(cors());
app.use(bodyParser.json());
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
