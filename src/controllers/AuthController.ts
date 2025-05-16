import { Auth_LoginDto } from '@app/dtos/Auth_LoginDto';
import { RoleGuard } from '@app/guards/RoleGuard';
import { AuthService } from '@app/services/AuthService';
import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signin')
    @ApiOperation({ summary: 'Đăng nhập', description: 'Api đăng nhập người dùng' })
    async auth(@Req() req, @Res() res, @Body() userAuthDto: Auth_LoginDto) {
        return res.status(HttpStatus.OK).json(await this.authService.login(userAuthDto));
    }

    @Get('/callback')
    @ApiOperation({ summary: 'Callback', description: 'Api callback' })
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    async callback(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json({ msg: "ok", data: req.user });
    }
}