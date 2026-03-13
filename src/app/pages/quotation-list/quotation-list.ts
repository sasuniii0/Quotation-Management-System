import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { QuotationService } from '../../services/quotation';
import { Quotation, QuoteStatus } from '../../models/quotation';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge';

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, StatusBadgeComponent],
  templateUrl: './quotation-list.html',
})
export class QuotationListComponent implements OnInit {
  quotations: Quotation[] = [];
  filtered: Quotation[] = [];
  search = '';
  activeFilter: QuoteStatus | 'All' = 'All';
  filters: (QuoteStatus | 'All')[] = ['All', 'Draft', 'Sent', 'Accepted', 'Rejected'];

  constructor(private quotationService: QuotationService) {}

  ngOnInit(): void {
    this.quotations = this.quotationService.getAll();
    this.applyFilter();
  }

  applyFilter(): void {
    this.filtered = this.quotations.filter(q => {
      const matchStatus = this.activeFilter === 'All' || q.status === this.activeFilter;
      const matchSearch = q.clientName.toLowerCase().includes(this.search.toLowerCase())
        || q.quoteNumber.toLowerCase().includes(this.search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }

  setFilter(f: QuoteStatus | 'All'): void {
    this.activeFilter = f;
    this.applyFilter();
  }

  delete(id: number): void {
    if (confirm('Delete this quotation?')) {
      this.quotationService.delete(id);
      this.quotations = this.quotationService.getAll();
      this.applyFilter();
    }
  }
}