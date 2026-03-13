import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { QuotationService } from '../../services/quotation';
import { QuoteItem, QuoteStatus } from '../../models/quotation';

@Component({
  selector: 'app-quotation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './quotation-form.html',
})
export class QuotationFormComponent implements OnInit {
  isEdit = false;
  editId?: number;
  clientName = '';
  clientEmail = '';
  status: QuoteStatus = 'Draft';
  notes = '';
  items: QuoteItem[] = [{ description: '', quantity: 1, unitPrice: 0 }];
  statuses: QuoteStatus[] = ['Draft', 'Sent', 'Accepted', 'Rejected'];

  get total(): number {
    return this.quotationService.calcTotal(this.items);
  }

  constructor(
    private quotationService: QuotationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.editId = +id;
      const q = this.quotationService.getById(this.editId);
      if (q) {
        this.clientName = q.clientName;
        this.clientEmail = q.clientEmail;
        this.status = q.status;
        this.notes = q.notes || '';
        this.items = [...q.items];
      }
    }
  }

  addItem(): void { this.items.push({ description: '', quantity: 1, unitPrice: 0 }); }
  removeItem(i: number): void { this.items.splice(i, 1); }

  submit(): void {
    const payload = {
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      status: this.status,
      notes: this.notes,
      items: this.items,
      totalAmount: this.total,
      createdDate: new Date().toISOString(),
    };
    if (this.isEdit && this.editId) {
      const existing = this.quotationService.getById(this.editId)!;
      this.quotationService.update({ ...existing, ...payload });
    } else {
      this.quotationService.create(payload);
    }
    this.router.navigate(['/quotations']);
  }
}