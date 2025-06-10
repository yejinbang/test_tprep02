const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// DB 파일 경로 설정 (프로젝트 루트에 chaeun.db가 있다고 가정)
const dbPath = path.resolve(__dirname, 'chaeuun.db');

// DB 연결
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('DB 연결 실패:', err.message);
  } else {
    console.log('SQLite DB 연결 성공');
  }
});

module.exports = db;
