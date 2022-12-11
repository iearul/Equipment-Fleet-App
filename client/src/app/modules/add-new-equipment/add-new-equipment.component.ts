import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EquipmentService } from "../../service/equipment-service/equipment.service";

@Component({
  selector: "app-add-new-equipment",
  templateUrl: "./add-new-equipment.component.html",
  styleUrls: ["./add-new-equipment.component.css"],
})
export class AddNewEquipmentComponent implements OnInit {
  eqpForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private eqpService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.eqpForm = this.eqpService.generateEqpForm();
  }

  onFomSubmit(): void {
    // TODO:
    this.eqpService.createEquipment(this.eqpForm.value).subscribe({
      next: (res) => {
        this.activeModal.close(true);
      },
      error: () => {},
    });
  }
}
