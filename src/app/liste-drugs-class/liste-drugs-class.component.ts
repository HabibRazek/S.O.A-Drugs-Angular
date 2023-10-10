import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrugClass } from 'src/model/DrugClass.model';
import { Drugservice } from '../services/drug.service';

@Component({
  selector: 'app-liste-drugs-class',
  templateUrl: './liste-drugs-class.component.html',
  styleUrls: ['./liste-drugs-class.component.css'],
})
export class ListeDrugsClassComponent implements OnInit {
  drugclass!: DrugClass[];
  drugclas!: DrugClass;
  updateddrugclass: DrugClass = { idcl: 0, name: '' };
  ajout: boolean = true;

  constructor(private drugService: Drugservice, private router: Router) {}

  ngOnInit(): void {
    this.drugService.listeDrugClass().subscribe((drugclass) => {
      console.log(drugclass);
      // this.drugclass = drugclass;
    });
  }

  ajoutDrugClass() {
    this.drugService
      .ajouterDrugClass(this.updateddrugclass)
      .subscribe((drug) => {
        console.log(drug);
        this.router.navigate(['drugs']);
        window.location.reload();
      });
  }

  update(drugclass: DrugClass) {
    this.updateddrugclass = drugclass;
    this.ajout = false;
  }

  updatedclass() {
    // window.location.reload();
    this.drugService
      .updateDrugClass(this.updateddrugclass)
      .subscribe((drug) => {
        console.log(drug);
        this.router.navigate(['liste-drugs-class']);
      });
  }
}
