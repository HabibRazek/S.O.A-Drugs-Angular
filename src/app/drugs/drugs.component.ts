import { Component, OnInit } from '@angular/core';
import { Drugs } from 'src/model/drugs.model';
import { AuthService } from '../services/auth.service';
import { Drugservice } from '../services/drug.service';
import { Image } from 'src/model/Image.model';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css'],
})
export class DrugsComponent implements OnInit {
  drugs!: Drugs[];


  constructor(
    public drugService: Drugservice,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.chargerDrugs();

  }

  chargerDrugs() {
    this.drugService.listeDrugs().subscribe(prods => {
      this.drugs = prods;
      this.drugs.forEach((prod) => {
        this.drugService
          .loadImage(prod.image.idImage)
          .subscribe((img: Image) => {
            prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });
      });
    });
  }

  supprimerDrug(d: number) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) this.drugService.supprimerDrug(d).subscribe(() => {
      console.log('Drug supprimé');
      this.chargerDrugs();
    });
  }

}
