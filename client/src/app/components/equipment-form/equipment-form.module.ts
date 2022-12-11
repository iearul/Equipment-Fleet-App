import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EquipmentFormComponent } from './equipment-form.component';

@NgModule({
  declarations: [EquipmentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EquipmentFormComponent]
})
export class EquipmentFormModule { }
