import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import type { Invoice } from '../types/invoice';
import { calculateTotals, VAT_RATE } from './calculations';

export async function generatePDF(invoice: Invoice) {
  const doc = new jsPDF({
    format: 'a4',
    unit: 'mm'
  });

  const totals = calculateTotals(invoice.items);
  
  const primaryColor = [0, 83, 155];
  const secondaryColor = [128, 128, 128];
  
  // En-tête
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('PharmaBill', 20, 25);
  
  // Informations de la facture
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.text('FACTURE', 20, 60);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text('Date :', 20, 70);
  doc.text('N° de facture :', 20, 75);
  doc.text('Client :', 20, 80);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(invoice.date, 40, 70);
  doc.text(invoice.invoiceNumber, 50, 75);
  doc.text(invoice.customerName, 40, 80);

  // Tableau des articles
  const startY = 100;
  const headers = ['Description', 'Quantité', 'Prix unitaire', 'Total'];
  const columnWidths = [80, 30, 30, 30];
  
  doc.setFillColor(245, 245, 245);
  doc.rect(20, startY - 5, 170, 10, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  let currentX = 20;
  headers.forEach((header, i) => {
    doc.text(header, currentX, startY);
    currentX += columnWidths[i];
  });

  doc.setFont('helvetica', 'normal');
  let currentY = startY + 10;
  
  invoice.items.forEach((item, index) => {
    const total = item.quantity * item.unitPrice;
    if (index % 2 === 0) {
      doc.setFillColor(252, 252, 252);
      doc.rect(20, currentY - 5, 170, 10, 'F');
    }
    
    currentX = 20;
    doc.text(item.description, currentX, currentY);
    currentX += columnWidths[0];
    doc.text(item.quantity.toString(), currentX, currentY);
    currentX += columnWidths[1];
    doc.text(item.unitPrice.toFixed(2), currentX, currentY);
    currentX += columnWidths[2];
    doc.text(total.toFixed(2), currentX, currentY);
    
    currentY += 10;
  });

  // Totaux et paiement
  const totalsY = currentY + 20;
  doc.setDrawColor(...secondaryColor);
  doc.line(120, totalsY - 5, 190, totalsY - 5);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Sous-total :', 120, totalsY);
  doc.text('TVA (' + (VAT_RATE * 100).toFixed(0) + '%) :', 120, totalsY + 10);
  
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL :', 120, totalsY + 20);
  
  doc.text(`${totals.subtotal.toFixed(2)} XOF`, 190, totalsY, { align: 'right' });
  doc.text(`${totals.vat.toFixed(2)} XOF`, 190, totalsY + 10, { align: 'right' });
  doc.text(`${totals.total.toFixed(2)} XOF`, 190, totalsY + 20, { align: 'right' });

  // Informations de paiement
  const paymentY = totalsY + 35;
  doc.setFillColor(245, 245, 245);
  doc.rect(120, paymentY - 5, 70, 35, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.text('PAIEMENT', 125, paymentY);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Mode :', 125, paymentY + 10);
  doc.text('Montant reçu :', 125, paymentY + 20);
  doc.text('Monnaie rendue :', 125, paymentY + 30);
  
  doc.setFont('helvetica', 'bold');
  doc.text(invoice.payment.method, 190, paymentY + 10, { align: 'right' });
  doc.text(`${invoice.payment.amountGiven.toFixed(2)} XOF`, 190, paymentY + 20, { align: 'right' });
  doc.text(`${invoice.payment.changeAmount.toFixed(2)} XOF`, 190, paymentY + 30, { align: 'right' });

  // QR Code
  const qrData = JSON.stringify({
    customer: invoice.customerName,
    total: totals.total,
    invoice: invoice.invoiceNumber,
    payment: invoice.payment
  });
  const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 100
  });
  doc.addImage(qrCodeDataUrl, 'PNG', 20, totalsY - 5, 30, 30);

  // Pied de page
  const footerY = 280;
  doc.setFillColor(245, 245, 245);
  doc.rect(0, footerY - 5, 210, 20, 'F');
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...secondaryColor);
  doc.text('Merci de votre confiance !', 105, footerY + 5, { align: 'center' });

  return doc;
}