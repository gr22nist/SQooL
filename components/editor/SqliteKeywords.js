import { completeFromList } from "@codemirror/autocomplete";

// SQLite 키워드 목록, 카테고리별로 정리
const sqliteKeywords = [
  // 기본 SQL 키워드
  "SELECT", "INSERT", "UPDATE", "DELETE", "FROM", "WHERE", "CREATE", "ALTER", "DROP", "TABLE", "INDEX",
  "VIEW", "TRIGGER", "JOIN", "ON", "GROUP", "BY", "ORDER", "LIMIT", "OFFSET", "HAVING", "DISTINCT",
  "UNION", "ALL", "AS", "INTO", "VALUES", "SET",

  // 데이터 정의 언어 (DDL)
  "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "CONSTRAINT", "DEFAULT", "UNIQUE", "CHECK", "AUTOINCREMENT",

  // 데이터 조작 언어 (DML)
  "INSERT", "UPDATE", "DELETE", "MERGE", "UPSERT", "REPLACE",

  // 조건문 및 연산자
  "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "IS", "NULL", "EXISTS",

  // 조인 유형
  "INNER", "LEFT", "RIGHT", "FULL", "CROSS", "NATURAL",

  // 집계 함수
  "AVG", "COUNT", "MAX", "MIN", "SUM", "GROUP_CONCAT", "TOTAL",

  // 윈도우 함수
  "OVER", "PARTITION BY", "ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE", "LAG", "LEAD", "FIRST_VALUE", "LAST_VALUE",

  // 수학 함수
  "ABS", "ROUND", "RANDOM", "CORR", "STDEV", "VARIANCE",

  // 문자열 함수
  "LOWER", "UPPER", "SUBSTR", "REPLACE", "INSTR", "LENGTH",

  // 날짜/시간 함수
  "DATE", "TIME", "DATETIME", "JULIANDAY", "STRFTIME",

  // 조건부 표현식
  "CASE", "WHEN", "THEN", "ELSE", "END", "COALESCE", "IFNULL", "NULLIF",

  // SQLite 특정 함수 및 키워드
  "SQLITE_VERSION", "CHANGES", "LAST_INSERT_ROWID", "PRAGMA",

  // 트랜잭션 관련
  "BEGIN", "COMMIT", "ROLLBACK", "TRANSACTION",

  // 서브쿼리 관련
  "EXISTS", "ANY", "ALL", "SOME",

  // CTE (Common Table Expression)
  "WITH", "RECURSIVE",

  // 기타 유용한 키워드
  "CAST", "TYPEOF", "EXPLAIN", "VACUUM", "ATTACH", "DETACH",

  // 테이블명 (프로젝트 특정)
  "Artist", "Album", "Member",

  // 고급 함수 및 키워드
  "CORR", "STDEV", "VARIANCE", "PERCENTILE_CONT", "PERCENTILE_DISC",
  "FIRST_VALUE", "LAST_VALUE", "NTH_VALUE", "CUME_DIST", "PERCENT_RANK",
  "LAG", "LEAD", "NTILE",
  "FILTER", "EXCLUDE", "GROUPS", "RANGE", "ROWS",
  "UNBOUNDED PRECEDING", "UNBOUNDED FOLLOWING", "CURRENT ROW",
  "IGNORE NULLS", "RESPECT NULLS",
  "WINDOW", "NULLS FIRST", "NULLS LAST",
  "PIVOT", "UNPIVOT",
  "MATCH", "AGAINST",
  "LATERAL",
  "INTERSECT", "EXCEPT",
  "GROUPING SETS", "CUBE", "ROLLUP",
  "MATERIALIZED",
  "TABLESAMPLE",
  "JSON_OBJECT", "JSON_ARRAY", "JSON_EXTRACT",
  "GENERATE_SERIES",
  "REGEXP", "GLOB",
  "RAISE",
  "SAVEPOINT",
  "RETURNING"
].map(keyword => ({ label: keyword, type: "keyword", boost: 1 }));

// 키워드 중요도 설정
sqliteKeywords.forEach(keyword => {
  // 주요 DML 명령어
  if (["SELECT", "INSERT", "UPDATE", "DELETE", "WITH"].includes(keyword.label)) {
    keyword.boost = 2;
  }
  // 프로젝트 특정 테이블명
  if (["Artist", "Album", "Member"].includes(keyword.label)) {
    keyword.boost = 1.5;
  }
  // 자주 사용되는 집계 함수 및 윈도우 함수
  if (["AVG", "COUNT", "MAX", "MIN", "SUM", "ROW_NUMBER", "RANK", "DENSE_RANK", "CORR", "STDEV", "LAG", "LEAD"].includes(keyword.label)) {
    keyword.boost = 1.8;
  }
});

export const sqliteCompletion = completeFromList(sqliteKeywords);