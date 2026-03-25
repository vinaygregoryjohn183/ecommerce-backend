import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private productsService: ProductsService,
  ) {}

  findAll() {
    return this.orderRepo.find({ relations: ['user', 'products'] });
  }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    // Relying on ProductsService to query products safely
    const products = await this.productsService.findByIds(createOrderDto.productIds);

    if (products.length !== createOrderDto.productIds.length) {
      throw new NotFoundException('One or more products were not found in the database');
    }

    // By passing an object with id, TypeORM knows to map the foreign key
    const order = this.orderRepo.create({
      user: { id: userId } as any,
      products: products,
      status: 'pending',
    });

    return this.orderRepo.save(order);
  }
}
