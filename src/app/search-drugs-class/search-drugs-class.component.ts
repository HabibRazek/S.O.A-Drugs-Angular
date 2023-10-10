import { Component, OnInit } from '@angular/core';
import { DrugClass } from 'src/model/DrugClass.model';
import { Drugs } from 'src/model/drugs.model';
import { AuthService } from '../services/auth.service';
import { Drugservice } from '../services/drug.service';

@Component({
  selector: 'app-search-drugs-class',
  templateUrl: './search-drugs-class.component.html',
  styleUrls: ['./search-drugs-class.component.css'],
})
export class SearchDrugsClassComponent implements OnInit {
  drugs!: Drugs[];
  DrugClass: any;
  drugsss!:DrugClass[]
  idcla!: number;

  constructor(private drugService: Drugservice ,public AuthService: AuthService) {
    this.DrugClass = this.drugService.listeDrugClass();

  }

  ngOnInit(): void {
    this.drugService.listeDrugClass().subscribe(drugclass => {
      console.log(drugclass);
      this.DrugClass = drugclass;
    });
    }

  supprimerProduit(d: number) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) this.drugService.supprimerDrug(d);
  }

  onChange() {
    this.drugService.rechercheDrugClass(this.idcla).subscribe((drugs) => {
      console.log(drugs);
      this.drugs = drugs;
    });
  }
}
