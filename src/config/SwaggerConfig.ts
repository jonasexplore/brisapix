import { DocumentBuilder } from '@nestjs/swagger';
import { resolve } from 'path';

export const configSwagger = new DocumentBuilder()
  .setTitle('Brisapix')
  .setDescription(
    `Documentação do Brisapix
  \nA api BrisaPix 🚀 permite o cadastro de novos usuários, cadastro de chaves PIX 
  com validação de duplicidade e limite máximo de 3 por usuário e realização de 
  transações entre usuários com validação de valor e se o usuário existe.
  \n\n<h4>Tecnologias usadas:</h4>
  \n- NestJS
  \n- TypeScript
  \n- TypeORM
  \n- Postgres
  \n\n<h4>Ferramentas:</h4>
  \n- Insomnia
  \n- Swagger
  \n\n<h4>Patterns:</h4>
  \n- REST`,
  )
  .setVersion('1.0')
  .setContact(
    'Jonas Brito',
    'https://github.com/FalLying',
    'jonasexplore@gmail.com',
  )
  .setExternalDoc(
    'Documentação do desafio',
    'https://github.com/brisalabs/challenge-back-end',
  )
  .build();
