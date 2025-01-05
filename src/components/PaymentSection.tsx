import React from 'react';
import { PAYMENT_METHODS } from '../constants/payment';
import type { PaymentMethod } from '../constants/payment';

interface PaymentSectionProps {
  total: number;
  amountGiven: number;
  paymentMethod: PaymentMethod;
  onAmountChange: (amount: number) => void;
  onMethodChange: (method: PaymentMethod) => void;
}

export function PaymentSection({
  total,
  amountGiven,
  paymentMethod,
  onAmountChange,
  onMethodChange,
}: PaymentSectionProps) {
  const showChange = paymentMethod === 'Espèces';
  const changeAmount = showChange ? amountGiven - total : 0;

  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-medium mb-4">Informations de paiement</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mode de paiement
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => onMethodChange(e.target.value as PaymentMethod)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        {showChange && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Montant reçu (XOF)
              </label>
              <input
                type="number"
                min={total}
                step="0.01"
                required
                value={amountGiven}
                onChange={(e) => onAmountChange(parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {amountGiven >= total && (
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-700">
                  Monnaie à rendre: {changeAmount.toFixed(2)} XOF
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}