import { Routes } from '@angular/router';
import { DashboardComponent } from '../core/pages/dashboard/dashboard.component';
import { DocumentComponent } from '../core/pages/document/document.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'docs',
        component: DocumentComponent
    }
];