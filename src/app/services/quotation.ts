import { Injectable } from '@angular/core';
import { Quotation, QuoteItem } from '../models/quotation';

@Injectable({ providedIn: 'root' })
export class QuotationService {
  private storageKey = 'quotations';

  getAll(): Quotation[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getById(id: number): Quotation | undefined {
    return this.getAll().find(q => q.id === id);
  }

  create(quotation: Omit<Quotation, 'id' | 'quoteNumber'>): Quotation {
    const all = this.getAll();
    const newQuote: Quotation = {
      ...quotation,
      id: Date.now(),
      quoteNumber: `QT-${String(all.length + 1).padStart(4, '0')}`,
    };
    this.save([...all, newQuote]);
    return newQuote;
  }

  update(updated: Quotation): void {
    const all = this.getAll().map(q => q.id === updated.id ? updated : q);
    this.save(all);
  }

  delete(id: number): void {
    this.save(this.getAll().filter(q => q.id !== id));
  }

  calcTotal(items: QuoteItem[]): number {
    return items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  }

  private save(data: Quotation[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}