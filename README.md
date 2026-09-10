# NestJS 프로젝트

TypeScript 엄격 모드와 Express 기반 NestJS 기본 프로젝트입니다.

## 실행

Node.js 24.15 이상과 pnpm 11을 사용합니다.

```sh
pnpm install
pnpm start:dev
```

http://localhost:3000 에서 SOLARC 태닝 성향 테스트를 이용할 수 있습니다.
히어로 첫 화면, 질문 4개와 별도 결과 화면으로 구성되어 있습니다.
테스트는 피부 진단이 아닌 취향 분류입니다. 기본 API는 `/api/hello`에 있습니다.
포트는 `PORT` 환경변수로 변경할 수 있으며 기본값은 3000입니다.

## 검증 및 빌드

```sh
pnpm build
pnpm lint
pnpm format:check
pnpm test
pnpm test:e2e
```

배포용 빌드 실행: `pnpm start:prod`

## 구조

- `src/main.ts`: 서버 진입점
- `src/app.module.ts`: 루트 모듈
- `src/app.controller.ts`: 기본 HTTP 경로
- `src/app.service.ts`: 서비스 로직
- `test/`: HTTP 통합 테스트

[NestJS 공식 문서](https://docs.nestjs.com/first-steps)
