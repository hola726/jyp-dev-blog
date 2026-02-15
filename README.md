# JYP Dev Blog

AI, Flutter, 모바일 개발에 대한 기술 블로그

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Content**: Velite + MDX
- **Styling**: Tailwind CSS 4 + Typography Plugin
- **Search**: Fuse.js
- **Comments**: Giscus
- **Deploy**: Vercel

## 시작하기

```bash
npm install
npm run dev
```

빌드:

```bash
npm run build
npm start
```

## 프로젝트 구조

```
content/posts/       # MDX 블로그 포스트
src/
├── app/             # Next.js App Router 페이지
│   ├── blog/        # 블로그 목록 및 상세
│   ├── tags/        # 태그별 필터링
│   ├── about/       # 소개 페이지
│   └── feed.xml/    # RSS 피드
├── components/      # React 컴포넌트
│   ├── layout/      # Header, Footer, ThemeSwitch
│   ├── blog/        # PostCard, PostList, TOC, TagList
│   ├── mdx/         # MDX 렌더링
│   ├── search/      # 검색 다이얼로그
│   └── comments/    # Giscus 댓글
└── lib/             # 유틸리티 및 설정
```

## 주요 기능

- MDX 기반 블로그 포스팅
- 다크/라이트 테마 전환
- 태그 기반 분류
- 클라이언트 사이드 검색
- 코드 구문 하이라이팅 (Shiki)
- 목차(TOC) 자동 생성
- RSS 피드, Sitemap, robots.txt
- Giscus 댓글
