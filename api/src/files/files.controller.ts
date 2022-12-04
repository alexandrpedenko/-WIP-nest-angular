import {
  Controller,
  Get,
  Param,
  UseGuards,
  Res
} from '@nestjs/common';
import * as path from 'path';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(path.join(process.cwd(), 'uploads/profileUploads/' + imagename));
  }
}
