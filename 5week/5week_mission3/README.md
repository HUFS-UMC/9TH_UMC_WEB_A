# Week 4 Mission - 회원가입 & 로그인 페이지 구현 💻

> 제출자: 최강 (choigang)  
> UMC 9th Web A Team

---

## 📌 과제 주제
React + TypeScript + Vite를 활용한 **회원가입 및 로그인 페이지 구현**

---

## 🧩 구현 내용

### ✅ 회원가입 (Signup)
- `react-hook-form` + `zod`를 이용한 입력값 유효성 검사
- 비밀번호 일치 여부 검증
- AxiosInstance를 통한 회원가입 API 연동 (`POST /v1/auth/register`)
- 성공 시 로그인 페이지로 이동 (`useNavigate` 활용)

### ✅ 로그인 (Signin)
- 유효성 검증 및 API 연동 (`POST /v1/auth/signin`)
- 로그인 성공 시 토큰 저장 및 리다이렉트 처리

---

## ⚙️ 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
