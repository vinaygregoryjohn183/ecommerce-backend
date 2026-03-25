import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard) // Protect ALL order routes globally
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    // req.user is guaranteed by our JwtAuthGuard payload map!
    return this.ordersService.create(req.user.sub, createOrderDto);
  }
}
