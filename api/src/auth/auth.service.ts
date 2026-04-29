import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        private usuarioService: UsuariosService,
        private jwtService: JwtService
    ) {}
    
    async login(LoginDto: LoginDto) {
        const { email, senha } = LoginDto;

        const usuario = await this.usuarioService.findByEmail(email);

        const isPasswordOk = await bcrypt.compare(senha, usuario.senha_hash);
        if (!usuario || !isPasswordOk) {
            throw new UnauthorizedException("E-mail ou senha incorretos.");
        }
        const payload = { id: usuario.id_usuario, cargo: usuario.id_cargo, email: usuario.email }

        return  {
            nome: usuario.nome,
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}