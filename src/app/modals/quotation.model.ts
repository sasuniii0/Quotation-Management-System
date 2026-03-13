export type QuoteStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected';

export interface QuoteItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Quotation {
  id: number;
  quoteNumber: string;
  clientName: string;
  clientEmail: string;
  items: QuoteItem[];
  totalAmount: number;
  status: QuoteStatus;
  createdDate: string;
  notes?: string;
}