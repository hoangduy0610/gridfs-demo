import { UserController } from '@app/controllers/UserController';
import { UserSchema } from '@app/schemas/UserSchema';
import { UserService } from '@app/services/UserService';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
    ],
})
export class UserModule { }