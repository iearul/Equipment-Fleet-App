import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-equipment-form",
  templateUrl: "./equipment-form.component.html",
  styleUrls: ["./equipment-form.component.css"],
})
export class EquipmentFormComponent {
  @Input() eqpForm!: FormGroup;

  constructor() {}

  onImageChanged(event: any): void {
    // const reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (event: any) => {
    // };
    this.eqpForm.get("image")?.patchValue(event.target.files[0]);
  }
}
