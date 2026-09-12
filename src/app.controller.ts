import { Controller, Get, Res, Param, NotFoundException } from '@nestjs/common';
import { join } from 'node:path';
import { AppService } from './app.service';

interface FileResponse {
  sendFile(path: string): void;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('assets/:filename')
  getQuestionAsset(
    @Param('filename') filename: string,
    @Res() response: FileResponse,
  ): void {
    if (
      ![
        'tan-photo.png',
        'tan-photo-golden.png',
        'reaction-0.png',
        'reaction-1.png',
        'reaction-2.png',
        'reaction-3.png',
        'hero-sunset.png',
        'hero-sky.png',
        'hero-scroll.mp4',
        'hero-start.png',
        'hero-foreground.png',
        'solarc-logo.svg',
        'textures.png',
        'ritual-before-glow.svg',
        'ritual-before-halo.svg',
        'ritual-before-sun.svg',
        'ritual-during.svg',
        'ritual-after.svg',
        'ritual-horizon.svg',
        'ritual-background-mask.svg',
        'ritual-scrub.png',
      ].includes(filename)
    )
      throw new NotFoundException();
    response.sendFile(join(__dirname, 'public', 'assets', filename));
  }

  @Get()
  getPage(@Res() response: FileResponse): void {
    response.sendFile(join(__dirname, 'public', 'index.html'));
  }

  @Get('app.js')
  getScript(@Res() response: FileResponse): void {
    response.sendFile(join(__dirname, 'public', 'app.js'));
  }

  @Get('style.css')
  getStyles(@Res() response: FileResponse): void {
    response.sendFile(join(__dirname, 'public', 'style.css'));
  }

  @Get('api/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('assets/hero-sunset.png')
  getHeroBackground(@Res() response: FileResponse): void {
    response.sendFile(join(__dirname, 'public', 'assets', 'hero-sunset.png'));
  }

  @Get('assets/solarc-logo.svg')
  getHeroLogo(@Res() response: FileResponse): void {
    response.sendFile(join(__dirname, 'public', 'assets', 'solarc-logo.svg'));
  }

  @Get('assets/textures.png')
  getTextures(@Res() response: FileResponse): void {
    response.sendFile(join(__dirname, 'public', 'assets', 'textures.png'));
  }
}
