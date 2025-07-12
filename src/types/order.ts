// ============================================================================
// ORDER DOMAIN TYPES
// ============================================================================

import type { BaseEntity, FilterParams, ShippingAddress } from './base';
import type { User } from './user';
import type { Product } from './product';

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product?: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Order extends BaseEntity {
  userId: number;
  user?: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddress;
  billingAddress: ShippingAddress;
  notes?: string;
}

// Order status types
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

// Order form types
export interface CreateOrderForm {
  userId: number;
  items: Omit<OrderItem, 'id' | 'orderId' | 'product'>[];
  shippingAddress: ShippingAddress;
  billingAddress: ShippingAddress;
  notes?: string;
}

export interface UpdateOrderForm {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  notes?: string;
}

// Order-specific filters
export interface OrderFilters extends FilterParams {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  userId?: number;
  dateFrom?: string;
  dateTo?: string;
} 