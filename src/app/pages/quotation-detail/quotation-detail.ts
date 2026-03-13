import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { QuotationService } from '../../services/quotation';
import { Quotation } from '../../models/quotation';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge';

@Component({
  selector: 'app-quotation-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent],
  templateUrl: './quotation-detail.html',
})
export class QuotationDetailComponent implements OnInit {
  quotation?: Quotation;

  constructor(
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.quotation = this.quotationService.getById(+id);
  }

  delete(): void {
    if (confirm('Delete this quotation?')) {
      this.quotationService.delete(this.quotation!.id);
      this.router.navigate(['/quotations']);
    }
  }

  print(): void { window.print(); }
}