import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Equipment } from "../../model/equipment.interface";

@Injectable({
  providedIn: "root",
})
export class EquipmentService {
  private equipmentList: Equipment[] = [];

  constructor(private httpClient: HttpClient) {}

  generateEqpForm(): FormGroup {
    const eqpFormGroup = new FormGroup({
      title: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      desc: new FormControl("", Validators.required),
      cNumber: new FormControl("", Validators.required),
      cYear: new FormControl("", Validators.required),
      image: new FormControl(""),
    });
    return eqpFormGroup;
  }

  getEquipments(data: any): Observable<any> {
    return this.httpClient.get("/equipment", { params: data });
  }

  createEquipment(equipment: any): Observable<any> {
    const formData = new FormData();
    formData.append("name", equipment?.title);
    formData.append("type", equipment?.type);
    formData.append("construction_number", equipment?.cNumber);
    formData.append("construction_year", equipment?.cYear);
    formData.append("image", equipment?.image);
    formData.append("description", equipment?.desc);

    return this.httpClient.post("/equipment", formData);
  }

  editEquipment(id: any, eqpItem: any): Observable<any> {
    const formData = new FormData();
    formData.append("name", eqpItem.title);
    formData.append("type", eqpItem.type);
    formData.append("construction_number", eqpItem.cNumber);
    formData.append("construction_year", eqpItem.cYear);
    formData.append("description", eqpItem.desc);
    formData.append("image", eqpItem.image);
    formData.append("id", id);
    return this.httpClient.post("/equipment/update-data", formData);
  }

  getDetailsEqp(id: number): Observable<any> {
    const res = this.httpClient.get("/equipment/" + id);
    return res;
  }

  deleteEqp(id: number): Observable<any> {
    return this.httpClient.delete("/equipment/" + id);
  }
}
