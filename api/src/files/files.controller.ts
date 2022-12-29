import {
  Controller,
  Get,
  Param,
  Res
} from '@nestjs/common';
import * as path from 'path';

@Controller('files')
export class FilesController {
  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(path.join(process.cwd(), 'uploads/profileUploads/' + imagename));
  }
}
