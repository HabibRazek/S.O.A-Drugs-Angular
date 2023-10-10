import { Component, OnInit } from '@angular/core';
import { Drugs } from 'src/model/drugs.model';
import { Drugservice } from '../services/drug.service';
import { DrugClass } from 'src/model/DrugClass.model';
import { Router } from '@angular/router';
import { Image } from 'src/model/Image.model';

@Component({
  selector: 'app-add-drugs',
  templateUrl: './add-drugs.component.html',
  styleUrls: ['./add-drugs.component.css'],
})
export class AddDrugsComponent implements OnInit {
  newDrugs = new Drugs();

  uploadedImage!: File;
  imagePath: any;

  DrugClass: any;
  newidcl!: number;
  newDrugClass!: DrugClass;

  dclass!: DrugClass[];

  constructor(private drugService: Drugservice, private router: Router) {
    this.DrugClass = this.drugService.listeDrugClass();
  }

  ngOnInit(): void {
    this.drugService.listeDrugClass().subscribe((drugclass) => {
      console.log(drugclass);
      this.DrugClass = drugclass;
    });
  }

  newDrug = new Drugs();
  addDrug() {
    this.drugService
      .uploadImage(this.uploadedImage, this.uploadedImage.name,)
      .subscribe((img: Image) => {
        console.log(img);
        console.log(this.newDrugs);
        this.newDrugs.image.idImage = img.idImage;
        this.newDrugs.drugClass = this.dclass.find(
          (d) => d.idcl == this.newidcl
        )!;
      });
    this.newDrug.drugClass = this.DrugClass.find(
      (item: { idcl: number }) => item.idcl == this.newidcl
    )!;

    this.drugService.ajouterDrug(this.newDrug).subscribe((drug) => {
      console.log(drug);
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}
