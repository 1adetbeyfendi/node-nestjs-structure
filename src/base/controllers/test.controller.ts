import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMarkets, UsersPermissionsUser } from 'src/entity/strapi';
import { Repository } from 'typeorm';

@Controller('test')
export class TestController {
  /**
   *
   */
  constructor(
    @InjectRepository(UserMarkets)
    private userMarketsRepository: Repository<UserMarkets>,
    @InjectRepository(UsersPermissionsUser)
    private UsersPermissionsUserRepository: Repository<UsersPermissionsUser>,
  ) {
    // super();
  }

  @Get('')
  async getUsers() {
    return this.userMarketsRepository.find({
      relations: ['user'],
    });
  }
}
