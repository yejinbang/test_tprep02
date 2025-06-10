const express = require('express');
const router = express.Router();
const db = require('../database'); // DB 연결 모듈 임포트

// GET /api/progress?classId={classId}
router.get('/', (req, res) => {
  const classId = Number(req.query.classId);

  // 1. 클래스 존재 여부 확인
  db.get(
    'SELECT id FROM class WHERE id = ?',
    [classId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'DB 오류' });
      }
      if (!row) {
        return res.status(404).json({ error: '반 데이터 없음' });
      }

      // 2. 해당 반의 진도 데이터 조회
      db.all(
        `SELECT 
          progress_grand AS grand,
          progress_middle AS middle,
          progress_small AS small,
          progress_subunit AS subunit,
          date
        FROM lesson_progress 
        WHERE class_id = ? 
        ORDER BY date DESC`,
        [classId],
        (err, rows) => {
          if (err) {
            return res.status(500).json({ error: '진도 조회 실패' });
          }

          // 3. 프론트엔드에 맞는 형식으로 변환
          const progressList = rows.map((row) => 
            `${row.grand} - ${row.middle} - ${row.small} (${row.subunit})`
          );

          res.json({
            prevProgress: progressList[1] || '', // 이전 진도 (예시)
            nextProgress: progressList[0] || '', // 다음 진도 (예시)
            progressList
          });
        }
      );
    }
  );
});

module.exports = router;
