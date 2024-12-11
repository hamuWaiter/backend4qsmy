import { Injectable } from '@nestjs/common';

@Injectable()
export class SiteService {
  getHello(): string {
    return 'today is a nice day!';
  }
}