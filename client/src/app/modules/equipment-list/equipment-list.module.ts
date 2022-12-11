import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { EquipmentFormModule } from "../../components/equipment-form/equipment-form.module";
import { AddNewEquipmentComponent } from "../add-new-equipment/add-new-equipment.component";
import { EquipmentDetailsComponent } from "../equipment-details/equipment-details.component";
import { EquipmentListComponent } from "./equipment-list.component";
import { NgbdSortableHeader } from "./sortable.directive";

const routes: Routes = [
  { path: "", component: EquipmentListComponent },
  { path: "eqp/:id", component: EquipmentDetailsComponent },
];

@NgModule({
  declarations: [
    EquipmentListComponent,
    EquipmentDetailsComponent,
    AddNewEquipmentComponent,
    NgbdSortableHeader
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    EquipmentFormModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
})
export class EquipmentListModule { }
