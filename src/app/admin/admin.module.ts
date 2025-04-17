import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserlistComponent } from './userlist/userlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    declarations: [
        AdminComponent,
        UserlistComponent,
        DashboardComponent
    ],
    exports: [
        AdminComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
