const express = require('express');
const cors = require('cors');
const app = express();

// 라우터 불러오기
const progressRouter = require('./test_yj/routes/progress');
// 만약 unitData 등 다른 라우터도 있다면 아래처럼 추가
// const unitDataRouter = require('./test_yj/routes/unitData');

app.use(cors({
  origin: [
    'https://han-chanhee.github.io', // 프론트 github.io 주소
    'http://localhost:3000' // 로컬 개발용
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// API 라우터 연결
app.use('/api/progress', progressRouter);
// app.use('/api/unit-data', unitDataRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
