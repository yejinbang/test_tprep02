const express = require('express');
const cors = require('cors');
const app = express();

const progressRouter = require('./routes/progress');
app.use(cors());
app.use(express.json());
app.use('/api/progress', progressRouter);

app.listen(4000, () => {
  console.log('서버가 http://localhost:4000 에서 실행 중입니다.');
});
