import { FilesController } from '@app/controllers/FileController';
import { FileSchema, File } from '@app/schemas/FileSchema';
import { FilesService } from '@app/services/FileService';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    ],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule { } 