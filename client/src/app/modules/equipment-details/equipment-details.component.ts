import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/auth/service/auth.service";
import { EquipmentService } from "app/service/equipment-service/equipment.service";
import { Subject, takeUntil } from "rxjs";
import { Equipment } from "../../model/equipment.interface";

@Component({
  selector: "app-equipment-details",
  templateUrl: "./equipment-details.component.html",
  styleUrls: ["./equipment-details.component.css"],
})
export class EquipmentDetailsComponent implements OnInit {
  private unsubscribe: Subject<boolean> = new Subject();

  isEdit: boolean = false;
  eqpId!: number;
  equipment!: Equipment;
  eqpForm!: FormGroup;

  constructor(
    private eqpService: EquipmentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.eqpId = +res["id"];
      this.getEqpDetails();
    });
  }

  getEqpDetails(): void {
    this.eqpService
      .getDetailsEqp(this.eqpId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((eqpDetails) => {
        this.equipment = eqpDetails;
      });
  }

  onEditEqp(): void {
    if (!this.eqpForm) {
      this.eqpForm = this.eqpService.generateEqpForm();
    }
    const image = "uploads/" + this.equipment?.image?.split("/uploads/")[1];
    this.eqpForm.setValue({
      title: this.equipment?.name,
      type: this.equipment?.type,
      image: image,
      desc: this.equipment.description,
      cNumber: this.equipment.construction_number,
      cYear: this.equipment.construction_year,
    });

    this.isEdit = true;
  }

  onFormSubmit(): void {
    this.eqpService
      .editEquipment(this.eqpId, this.eqpForm.value)
      .subscribe((res) => {
        this.isEdit = false;
        this.eqpForm.reset();
        this.getEqpDetails();
      });
  }
}
