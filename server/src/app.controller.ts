import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'ecom-company-site',
      timestamp: new Date().toISOString()
    };
  }
}
