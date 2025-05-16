import { FilesService } from '@app/services/FileService';
import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @Post('upload')
    @ApiOperation({ summary: 'Upload a file' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.filesService.uploadFile(file);
    }

    @Get()
    @ApiOperation({ summary: 'Get all files' })
    async getFiles() {
        return this.filesService.getFiles();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Download a file' })
    @ApiParam({ name: 'id', description: 'File ID' })
    async downloadFile(@Param('id') id: string, @Res() res: Response) {
        const { stream, filename, contentType } = await this.filesService.downloadFile(id);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', contentType);
        stream.pipe(res);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a file' })
    @ApiParam({ name: 'id', description: 'File ID' })
    async deleteFile(@Param('id') id: string) {
        return this.filesService.deleteFile(id);
    }
} 