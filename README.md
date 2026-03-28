# Orbit Commerce - Company Site

E-commerce company 소개용 단일 페이지와 문의 폼(서버리스)을 포함한 프로젝트입니다.

## 구조
- `client/` : React + Vite 프론트엔드
- `client/api/` : Vercel Functions (문의 폼 API)
- `server/` : Nest.js 로컬 서버(선택 사항)

## 기술 스택
**Frontend**
- React 18
- TypeScript
- Vite

**Serverless API**
- Vercel Functions (Node.js runtime)

**Database**
- Supabase (무료 티어)

## 로컬 실행

### 프론트 개발 서버
```bash
cd client
npm install
npm run dev
```

### 프론트 빌드
```bash
cd client
npm run build
```

### 로컬 Nest 서버(선택)
```bash
cd server
npm install
npm run build
npm start
```

## 배포 (Vercel)
Vercel에서 프로젝트를 생성한 뒤 다음 설정으로 배포합니다.

- Root Directory: `client`
- Build Command: `npm run build:vercel`
- Output Directory: `dist`

## 환경 변수 (Vercel)
아래 값은 Vercel 프로젝트의 Environment Variables에 설정합니다.

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Supabase 테이블
SQL Editor에서 아래 스키마를 생성합니다.

```sql
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  company text,
  phone text,
  message text not null,
  consent boolean default false
);
```

## 주요 파일
- `client/src/App.tsx` : 화면 및 문의 폼
- `client/src/styles.css` : 스타일
- `client/api/contact.ts` : 문의 폼 API
