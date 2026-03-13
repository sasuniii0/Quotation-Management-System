import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { QuotationListComponent } from './pages/quotation-list/quotation-list';
import { QuotationFormComponent } from './pages/quotation-form/quotation-form';
import { QuotationDetailComponent } from './pages/quotation-detail/quotation-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'quotations', component: QuotationListComponent },
  { path: 'quotations/new', component: QuotationFormComponent },
  { path: 'quotations/edit/:id', component: QuotationFormComponent },
  { path: 'quotations/:id', component: QuotationDetailComponent },
];