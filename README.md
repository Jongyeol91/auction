## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

22/11/9

### 버그

- [x] 비딩 고치기!! (내경매, 참여경매 안되게)
- [x] 이미지 파일 첨부
  - [x] 경매
  - [x] 회원가입
- [x] 로그인 실패시 얼럿 나오면서 기존 화면 위로 밀리는 버그 수정
  - [x] 로그인시 신규 모달 적용
- [x] 모바일 헤더 수정 (검색 버튼 대체, 로그인시 노출 하는 버튼 정하기)
- [x] 경매 만들기 뒤로가기 했을 경우 금속옵션과 이미지 validation 걸리는 이슈 수정
- [x] 경매 만들기 pc 레이아웃 수정
- [x] 비밀번호 변경하기 페이지 텍스트 수정
- [x] 이메탈 로고 정렬, 마우스 호버시 cursor
- [x] 비로그인 상태로 protedced router url로 바로 접근했을경우 리다이렉트

### 요구사항

- [x] 헤더 메뉴들을 아이콘으로 전환
- [x] 시세 최근 값을 메인 페이지에 노출, 클릭 후 시계열 데이터 볼 수 있도록 전환
- [x] 금속 옵션 유저가 생성할 수 있도록 처리
- [x] 경매 호스트 이름 비노출 처리
- [x] 알람 클릭시 드롭다운으로 해당 경매건 카드 노출
  - [x] collapse ui
  - [x] 알림에서 card api 가져오기 (백엔드 상의 필요)
- [x] 경매 박스 디자인 수정
- [x] footer
- [x] 필터링 기능

### 개선

- [x] 모달, 다이얼로그 컴포넌트
- [x] 비로그인 상태로 글쓰기 선택시, 로그인 페이지로 이동 여부 노출
- [x] 비딩 ui/ux (시간되면)

### 배포

- [x] ec2에 yarn, node, pm2 설치
- [x] nginx reverse proxy 사용하기
