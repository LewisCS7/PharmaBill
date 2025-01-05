import type { PaymentMethod } from '../constants/payment';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface PaymentInfo {
  method: PaymentMethod;
  amountGiven: number;
  changeAmount: number;
}

export interface Invoice {
  customerName: string;
  items: InvoiceItem[];
  date: string;
  invoiceNumber: string;
  payment: PaymentInfo;
}

export interface InvoiceTotals {
  subtotal: number;
  vat: number;
  total: number;
}