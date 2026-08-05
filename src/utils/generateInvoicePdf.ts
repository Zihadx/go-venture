import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Invoice } from "@/types/billing";
import { formatCurrency, formatDate } from "@/utils/format";

const BRAND_TEAL = "#2095ae";
const BRAND_NAVY = "#023f4e";

export function generateInvoicePdf(invoice: Invoice): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;

  // Header
  doc.setFillColor(BRAND_TEAL);
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setTextColor("#ffffff");
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Go-Venture", margin, 45);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Travel Agency Management Platform", margin, 63);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", pageWidth - margin, 45, { align: "right" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(invoice.id, pageWidth - margin, 63, { align: "right" });

  // Billing info
  doc.setTextColor(BRAND_NAVY);
  let y = 120;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Billed to", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(invoice.customer.name, margin, y + 16);
  doc.text(invoice.customer.email, margin, y + 32);

  doc.setFont("helvetica", "bold");
  doc.text("Booking details", pageWidth - margin, y, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(`Booking: ${invoice.bookingId}`, pageWidth - margin, y + 16, { align: "right" });
  doc.text(`Issued: ${formatDate(invoice.issuedAt)}`, pageWidth - margin, y + 32, { align: "right" });
  doc.text(`Due: ${formatDate(invoice.dueAt)}`, pageWidth - margin, y + 48, { align: "right" });

  y += 70;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`${invoice.packageName} — ${invoice.destination}`, margin, y);

  // Line items table
  autoTable(doc, {
    startY: y + 20,
    head: [["Description", "Qty", "Unit price", "Total"]],
    body: invoice.lineItems.map((li) => [
      li.label,
      String(li.quantity),
      formatCurrency(li.unitPrice, invoice.currency),
      formatCurrency(li.total, invoice.currency),
    ]),
    headStyles: { fillColor: [2, 63, 78] },
    styles: { fontSize: 10, cellPadding: 8 },
    margin: { left: margin, right: margin },
  });

  // @ts-ignore — jspdf-autotable augments doc with lastAutoTable at runtime
  let finalY = doc.lastAutoTable.finalY + 20;

  const totalsX = pageWidth - margin - 180;
  const line = (label: string, value: string, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 12 : 10);
    doc.text(label, totalsX, finalY);
    doc.text(value, pageWidth - margin, finalY, { align: "right" });
    finalY += bold ? 22 : 18;
  };

  line("Subtotal", formatCurrency(invoice.subtotal, invoice.currency));
  if (invoice.discount.amount > 0) {
    line(`Discount ${invoice.discount.code ? `(${invoice.discount.code})` : ""}`, `-${formatCurrency(invoice.discount.amount, invoice.currency)}`);
  }
  line(`Tax (${Math.round(invoice.taxRate * 100)}%)`, formatCurrency(invoice.taxAmount, invoice.currency));
  doc.setDrawColor(BRAND_TEAL);
  doc.line(totalsX, finalY - 8, pageWidth - margin, finalY - 8);
  line("Total", formatCurrency(invoice.total, invoice.currency), true);

  // Payment status badge
  doc.setFillColor(invoice.status === "paid" ? "#0EA65F" : invoice.status === "refunded" ? "#6B7280" : "#DC2626");
  doc.roundedRect(margin, finalY, 90, 22, 4, 4, "F");
  doc.setTextColor("#ffffff");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(invoice.status.toUpperCase(), margin + 45, finalY + 15, { align: "center" });

  // Payment history
  if (invoice.payments.length) {
    finalY += 50;
    doc.setTextColor(BRAND_NAVY);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Payment history", margin, finalY);
    autoTable(doc, {
      startY: finalY + 10,
      head: [["Date", "Method", "Amount", "Status"]],
      body: invoice.payments.map((p) => [
        formatDate(p.paidAt),
        p.method.replace("_", " ").toUpperCase(),
        formatCurrency(p.amount, invoice.currency),
        p.status,
      ]),
      headStyles: { fillColor: [32, 149, 174] },
      styles: { fontSize: 9, cellPadding: 6 },
      margin: { left: margin, right: margin },
    });
  }

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setTextColor("#9ca3af");
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for booking with Go-Venture. Questions? Reach out via your dashboard support tickets.", margin, pageHeight - 30);

  doc.save(`${invoice.id}.pdf`);
}
