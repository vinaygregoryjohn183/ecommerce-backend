import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
    ) {}

    async create(email: string, passwordHash: string) {
        const user = this.repo.create({ email, passwordHash });
        return this.repo.save(user);
    }

    async findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    async findAll() {
        return this.repo.find();
    }
}
