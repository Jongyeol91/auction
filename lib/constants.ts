export const AUTH_DESCRIPTIONS = {
  login: {
    userIdPlaceholder: '이메일을 입력해주세요.',
    passwordPlaceholder: '비밀번호를 입력하세요.',
    buttonText: '로그인',
    actionText: '회원가입',
    question: '계정이 없으신가요?',
    actionLink: '/register',
  },
  register: {
    userIdPlaceholder: '이메일을 입력해주세요',
    passwordPlaceholder: '8자 이상, 숫자, 특수문자 포함',
    buttonText: '회원가입',
    actionText: '로그인',
    question: '이미 회원이신가요?',
    actionLink: '/login',
  },
  modify: {
    userIdPlaceholder: '이메일을 입력해주세요',
    passwordPlaceholder: '8자 이상, 숫자, 특수문자 포함',
    buttonText: '수정',
    actionText: '로그인',
    question: '이미 회원이신가요?',
    actionLink: '/login',
  },
} as const;

export const NORMAL = 'NORMAL';
export const REVERSE = 'REVERSE';

export const AUCTION_TYPE_OPTION = [
  { label: '경매', value: 'NORMAL' },
  { label: '역경매', value: 'REVERSE' },
];

export const AUCTION_TYPE = {
  NORMAL: '경매',
  REVERSE: '역경매',
};
