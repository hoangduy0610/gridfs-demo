import { User_UpdateDto } from '@app/dtos/User_UpdateDto';
import { SystemRoleEnum } from '@app/enums/SystemRoleEnum';
import { Role } from '@app/guards/RoleDecorator';
import { RoleGuard } from '@app/guards/RoleGuard';
import { UserService } from '@app/services/UserService';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Role(SystemRoleEnum.ROLE_ADMIN)
    async findAll(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.userService.findAll());
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Role(SystemRoleEnum.ROLE_ADMIN)
    async findOne(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(HttpStatus.OK).json(await this.userService.findOne(id));
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    @Role(SystemRoleEnum.ROLE_ADMIN)
    async update(@Req() req, @Res() res, @Param('id') id: string, @Body() data: User_UpdateDto) {
        return res.status(HttpStatus.OK).json(await this.userService.update(id, data));
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    @Role(SystemRoleEnum.ROLE_ADMIN)
    async delete(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(HttpStatus.OK).json(await this.userService.remove(id));
    }

    @Post('/assign-role')
    @ApiQuery({ name: 'userId', required: true })
    @ApiQuery({ name: 'role', required: true, enum: SystemRoleEnum })
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    @Role(SystemRoleEnum.ROLE_ADMIN)
    async assignRole(@Req() req, @Res() res, @Query('userId') userId: string, @Query('role') role: SystemRoleEnum) {
        return res.status(HttpStatus.OK).json(await this.userService.updateRole(userId, role));
    }
}