import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Invoice, InvoiceItem } from '../types/invoice';
import type { PaymentMethod } from '../constants/payment';
import { calculateTotals, VAT_RATE } from '../utils/calculations';
import { PaymentSection } from './PaymentSection';

interface InvoiceFormProps {
  onSubmit: (invoice: Invoice) => void;
}

export function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([{ description: '', quantity: 1, unitPrice: 0 }]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Espèces');
  const [amountGiven, setAmountGiven] = useState<number>(0);
  const totals = calculateTotals(items);

  useEffect(() => {
    if (totals.total > 0) {
      setAmountGiven(totals.total);
    }
  }, [totals.total]);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString().split('T')[0];
    const invoiceNumber = `INV-${Date.now()}`;
    const payment = {
      method: paymentMethod,
      amountGiven: paymentMethod === 'Espèces' ? amountGiven : totals.total,
      changeAmount: paymentMethod === 'Espèces' ? amountGiven - totals.total : 0
    };
    onSubmit({ customerName, items, date, invoiceNumber, payment });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
          Nom du Client
        </label>
        <input
          type="text"
          id="customerName"
          required
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Description du produit</label>
              <input
                type="text"
                required
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700">Quantité</label>
              <input
                type="number"
                min="1"
                required
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700">Prix unitaire</label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={item.unitPrice}
                onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="mt-6 text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <PlusCircle className="w-5 h-5" />
        Ajouter un article
      </button>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Sous-total:</span>
          <span>{totals.subtotal.toFixed(2)} XOF</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">TVA ({(VAT_RATE * 100).toFixed(0)}%):</span>
          <span>{totals.vat.toFixed(2)} XOF</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>{totals.total.toFixed(2)} XOF</span>
        </div>
      </div>

      <PaymentSection
        total={totals.total}
        amountGiven={amountGiven}
        paymentMethod={paymentMethod}
        onAmountChange={setAmountGiven}
        onMethodChange={setPaymentMethod}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Générer la Facture
      </button>
    </form>
  );
}