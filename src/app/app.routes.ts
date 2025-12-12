import { Routes } from '@angular/router';
import { FruitListComponent } from './component/fruit-list-component/fruit-list-component';
import { StockPageComponent } from './component/stock-page-component/stock-page-component';

export const routes: Routes = [
    {
        path:'',
        component:FruitListComponent
    },
    {
        path:'promo',
        loadComponent: async () => (await import('./component/fruit-promo-form-component/fruit-promo-form-component')).FruitPromoFormComponent
    },
    {
        path:'stock',
        component:StockPageComponent
    }
];
