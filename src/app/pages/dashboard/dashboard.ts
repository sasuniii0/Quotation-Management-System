import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuotationService } from '../../services/quotation';
import { Quotation } from '../../models/quotation';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  quotations: Quotation[] = [];

  get total() { return this.quotations.length; }
  get draft() { return this.quotations.filter(q => q.status === 'Draft').length; }
  get sent() { return this.quotations.filter(q => q.status === 'Sent').length; }
  get accepted() { return this.quotations.filter(q => q.status === 'Accepted').length; }
  get rejected() { return this.quotations.filter(q => q.status === 'Rejected').length; }
  get totalValue() { return this.quotations.reduce((s, q) => s + q.totalAmount, 0).toFixed(2); }
  get recent() { return this.quotations.slice(-5).reverse(); }

  constructor(private quotationService: QuotationService) {}

  ngOnInit(): void {
    this.quotations = this.quotationService.getAll();
  }
}