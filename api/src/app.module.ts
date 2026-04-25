import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosModule } from './usuarios/usuarios.module';
import "dotenv/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // No Docker, usamos o nome do serviço 'db' ou a variável de ambiente
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
