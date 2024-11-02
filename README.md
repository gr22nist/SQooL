# SQooL

> **한글 데이터로 배우는 마음 편한 SQLite!**
> 
> 설치 없이 바로 실행하는 웹 기반 SQL 학습 플랫폼

## 🎯 프로젝트 소개

SQooL은 SQL 입문자와 비전공자를 위한 웹 기반 SQL 학습 플랫폼입니다. K-문화 테마의 한글 데이터베이스를 활용하여 친숙하고 재미있게 SQL을 학습할 수 있도록 설계되었습니다.

### 특장점

- **웹 기반 SQL 에디터**:
  - 설치 없이 브라우저에서 바로 실행
  - 실시간 SQL 쿼리 실행
  - 다크/라이트 모드 지원

- **학습자 중심 설계**:
  - K-문화 테마의 한글 데이터베이스
  - 직관적인 UI/UX
  - 실시간 쿼리 결과 확인
  - 학습 문서와 에디터 동시 표시

- **최적화된 사용자 경험**:
  - 반응형 레이아웃
  - 드래그로 크기 조절 가능한 패널
  - 자동 데이터베이스 초기화

## 🛠️ 기술 스택

### Core
- Next.js 14
- React 18
- Tailwind CSS
- Zustand (상태관리)

### 주요 라이브러리
- **에디터**
  - CodeMirror 6
  - @codemirror/lang-sql
  - @codemirror/autocomplete

- **UI/UX**
  - @tailwindcss/typography
  - flowbite-react
  - react-transition-group

- **보안**
  - DOMPurify

### 개발 도구
- ESLint
- Prettier

## 🌐 주요 기능

### 1. SQL 에디터
- 실시간 쿼리 실행
- 자동 완성
- 문법 하이라이팅
- 결과 테이블 표시

### 2. 학습 문서
- 카테고리별 문서 구조
- 마크다운 지원
- 실시간 렌더링
- 코드 예제 포함

### 3. 아티클
- 어드민 게시판 기능
- 댓글 시스템
- 카테고리 분류
- 페이지네이션


## 🌐 브라우저 지원
- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)