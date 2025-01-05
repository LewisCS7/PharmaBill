import React from 'react';
import { Receipt } from 'lucide-react';
import { InvoiceForm } from './components/InvoiceForm';
import type { Invoice } from './types/invoice';
import { generatePDF } from './utils/pdf';

function App() {
  const handleGenerateInvoice = async (invoice: Invoice) => {
    try {
      const doc = await generatePDF(invoice);
      doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Receipt className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">PharmaBill</h1>
          </div>
          <p className="text-gray-600">Générez des factures médicales professionnelles avec codes QR</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <InvoiceForm onSubmit={handleGenerateInvoice} />
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PharmaBill. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}

export default App;