ALTER TABLE spots ADD COLUMN grid_nx INT NULL;
ALTER TABLE spots ADD COLUMN grid_ny INT NULL;

-- 기존 5개 스팟에 좌표 시드
UPDATE spots SET grid_nx=70, grid_ny=121 WHERE id=1;  -- 평창
UPDATE spots SET grid_nx=52, grid_ny=38  WHERE id=2;  -- 서귀포
UPDATE spots SET grid_nx=60, grid_ny=127 WHERE id=3;  -- 서울
UPDATE spots SET grid_nx=98, grid_ny=76  WHERE id=4;  -- 부산
UPDATE spots SET grid_nx=89, grid_ny=91  WHERE id=5;  -- 경주
