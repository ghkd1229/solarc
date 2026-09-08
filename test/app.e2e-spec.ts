import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('serves the test landing page', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/SOLARC/);
  });

  it('serves the interactive script', () => {
    return request(app.getHttpServer()).get('/app.js').expect(200);
  });

  it('serves the styles', () => {
    return request(app.getHttpServer()).get('/style.css').expect(200);
  });

  it('serves the questionnaire texture image', () => {
    return request(app.getHttpServer())
      .get('/assets/textures.png')
      .expect(200)
      .expect('Content-Type', /image\/png/)
      .expect((response) => {
        expect(response.body.length).toBeGreaterThan(100000);
      });
  });

  it('preserves the greeting API', () => {
    return request(app.getHttpServer())
      .get('/api/hello')
      .expect(200)
      .expect('Hello World!');
  });
});
