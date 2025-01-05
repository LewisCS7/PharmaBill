export const PAYMENT_METHODS = [
  'Espèces',
  'Carte bancaire',
  'Mobile Money',
  'Chèque',
] as const;

export type PaymentMethod = typeof PAYMENT_METHODS[number];