import { Constant } from '@app/commons/Constant';
import { AuthController } from '@app/controllers/AuthController';
import { JwtStrategy } from '@app/guards/JWTStrategy';
import { UserSchema } from '@app/schemas/UserSchema';
import { AuthService } from '@app/services/AuthService';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.register({
            secret: Constant.JWT_SECRET,
            signOptions: { expiresIn: Constant.JWT_EXPIRE },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
})
export class AuthModule { }