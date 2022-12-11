import { Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Equipment } from "app/model/equipment.interface";
import { Subject, takeUntil } from "rxjs";
import { EquipmentService } from "../../service/equipment-service/equipment.service";
import { AddNewEquipmentComponent } from "../add-new-equipment/add-new-equipment.component";
import { NgbdSortableHeader, SortEvent } from "./sortable.directive";

const compare = (v1: any, v2: any) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

@Component({
  selector: "app-equipment-list",
  templateUrl: "./equipment-list.component.html",
  styleUrls: ["./equipment-list.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class EquipmentListComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<boolean> = new Subject();

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  equipmentList: Equipment[] = [];
  selectedNote!: Equipment;

  equipment!: any;
  page: any = 1;
  total: any = 100;
  searchField = new FormControl();
  q: any = null;

  constructor(
    private eqpService: EquipmentService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        this.q = res;
        this.eqpService
          .getEquipments({ q: this.q ?? "", page: this.page })
          .pipe(takeUntil(this.unsubscribe))
          .subscribe({
            next: (res) => {
              this.equipmentList = res?.result;
              this.total = res.pagination.totalCount;
            },
            error: () => { },
          });
      });
    this.getEquipmentList();
  }

  onSort({ column, direction }: SortEvent) {
    console.log(column, direction);

    const spareEqpList = [...this.equipmentList];
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.equipmentList = spareEqpList;
    } else {
      this.equipmentList = [...this.equipmentList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  getEquipmentList(): void {
    this.eqpService
      .getEquipments({ q: this.q ?? "", page: this.page })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res) => {
          this.equipmentList = res?.result;
          this.total = res.pagination.totalCount;
        },
        error: () => { },
      });
  }

  changePage(event: any): void {
    this.page = event;
    this.eqpService
      .getEquipments({ q: this.q ?? "", page: event })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res) => {
          this.equipmentList = res?.result;
          this.total = res.pagination.totalCount;
        },
        error: () => { },
      });
  }

  addEquipment(): void {
    const modalRef = this.modalService.open(AddNewEquipmentComponent);
    modalRef.result.then(
      (result) => {
        this.getEquipmentList();
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  onDetailView(id: number): void {
    this.router
      .navigate(["eqp", id], { relativeTo: this.route })
      .then((r) => r);
  }

  deleteEquipment(id: number): void {
    this.eqpService
      .deleteEqp(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res) => {
          this.getEquipmentList();
        },
        error: () => { },
      });
  }

}
