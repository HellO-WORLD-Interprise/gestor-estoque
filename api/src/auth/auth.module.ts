import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtValidator } from './jwt-validator';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import "dotenv/config";

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtValidator],
})

export class AuthModule {}