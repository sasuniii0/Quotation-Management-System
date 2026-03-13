import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { QuoteStatus } from '../../models/quotation';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [NgClass],
  template: `
    <span [ngClass]="badgeClass" class="text-xs font-medium px-2.5 py-1 rounded-full">
      {{ status }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input() status!: QuoteStatus;

  get badgeClass(): string {
    const map: Record<QuoteStatus, string> = {
      Draft:    'bg-gray-100 text-gray-600',
      Sent:     'bg-blue-100 text-blue-700',
      Accepted: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-600',
    };
    return map[this.status] ?? 'bg-gray-100 text-gray-600';
  }
}