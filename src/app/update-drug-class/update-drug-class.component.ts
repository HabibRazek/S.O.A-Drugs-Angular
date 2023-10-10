import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DrugClass } from 'src/model/DrugClass.model';
import { ListeDrugsClassComponent } from '../liste-drugs-class/liste-drugs-class.component';

@Component({
  selector: 'app-update-drug-class',
  templateUrl: './update-drug-class.component.html',
  styleUrls: ['./update-drug-class.component.css'],
})
export class UpdateDrugClassComponent implements OnInit {
  @Input()
  drugclass!: DrugClass;
  @Output()
  updateddrugclass = new EventEmitter<DrugClass>();

  @Input()
  ajout!: boolean;

  constructor(
    private ListeDrugsClassComponent: ListeDrugsClassComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.drugclass);
    console.log(this.ajout);
  }

  saveDrugClass() {
    this.updateddrugclass.emit(this.drugclass);
    if (this.ajout) this.ListeDrugsClassComponent.ajoutDrugClass();
    else this.ListeDrugsClassComponent.updatedclass();
    this.router.navigate(['liste-drugs-class']);
  }
}
