import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'node:path';
import { AppService } from './app.service';

interface FileResponse {
  sendFile(path: string): void;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
