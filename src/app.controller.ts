import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { User } from './user/entities/user.entity';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @IsPublic()
  @Get('/swagger.json')
  async getDocs(): Promise<any> {
    const docFile = join(process.cwd(), 'swagger.json');

    const file = await readFile(docFile);

    return file.toString();
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
