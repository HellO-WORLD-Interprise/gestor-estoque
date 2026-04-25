import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "./entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  
  constructor (
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  private readonly saltRounds = 10;

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hash = await bcrypt.hash(createUsuarioDto.senha_hash, this.saltRounds);
    createUsuarioDto.senha_hash = hash;

    const newUsuario = this.usuarioRepository.create(createUsuarioDto); 
    return await this.usuarioRepository.save(newUsuario);
  }

  async findAll() {
    return await this.usuarioRepository.find({
      where: { is_ativo: true }
    });
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findOneBy({ 
      id_usuario: id, 
      is_ativo: true 
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);

    if (updateUsuarioDto.senha_hash) {
      updateUsuarioDto.senha_hash = await bcrypt.hash(
        updateUsuarioDto.senha_hash, 
        this.saltRounds
      );
    }
    else {
      delete updateUsuarioDto.senha_hash;
    }

    await this.usuarioRepository.update({ id_usuario: id }, updateUsuarioDto);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.usuarioRepository.update({ id_usuario: id }, { is_ativo: false });

    return { message: `Usuário ${id} desativado com sucesso.` };
  }
}