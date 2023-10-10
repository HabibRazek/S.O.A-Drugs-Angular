import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Drugservice } from '../services/drug.service';
import { Drugs } from 'src/model/drugs.model';
import { DrugClass } from 'src/model/DrugClass.model';
import { Image } from 'src/model/Image.model';


@Component({
  selector: 'app-update-drug',
  templateUrl: './update-drug.component.html',
  styleUrls: ['./update-drug.component.css'],
})
export class UpdateDrugComponent implements OnInit {
  currentDrug = new Drugs();
  emptyDrugclass = new DrugClass();
  DrugClass!: any;
  updateidcl!: number;
  drugclasses! : DrugClass[];

  myImage!: string;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private drugService: Drugservice
  ) {
    this.DrugClass = this.drugService.listeDrugClass();
  }

  ngOnInit(): void {
    this.emptyDrugclass.name = "";
    this.emptyDrugclass.idcl = 0;
    this.drugService.listeDrugClass().subscribe((data) => {
      this.DrugClass = data;
    });
    this.drugService
      .consulterDrug(this.activatedRoute.snapshot.params['id'])
      .subscribe((data) => {
        this.currentDrug = data;
        this.updateidcl = this.currentDrug.drugClass.idcl;
      });
    this.drugService
      .loadImage(this.currentDrug.image.idImage)
      .subscribe((img: Image) => {
        this.myImage = 'data:' + img.type + ';base64,' + img.image;
      });


  };




  updateDrug() {
    this.currentDrug.drugClass = this.DrugClass.find((dclass: { idcl: Number; }) => dclass.idcl == this.updateidcl)
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.drugService
        .uploadImage(this.uploadedImage, this.uploadedImage.name,)
        .subscribe((img: Image) => {
          this.currentDrug.image = img;
          this.drugService
            .updateDrug(this.currentDrug)
            .subscribe((prod) => {
            });
        });
    }
    else {
      this.drugService
        .updateDrug(this.currentDrug)
        .subscribe((prod) => {
        });
    }
  }










  // updateDrug() {
  //   this.currentDrug.drugClass = this.DrugClass.find((dclass: { idcl: Number; }) => dclass.idcl == this.updateidcl)!;
  //   this.drugService.updateDrug(this.currentDrug).subscribe((data) => {
  //     this.currentDrug.drugClass = this.emptyDrugclass;
  //   });
  // }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }



  onAddImageDrug() {
    this.drugService
    .uploadImage(this.uploadedImage,this.uploadedImage.name)
    .subscribe( (img : Image) => {
    this.currentDrug.images.push(img);
    });
    }


    supprimerImage(img: Image){
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.drugService.supprimerImage(img.idImage).subscribe(() => {
      //supprimer image du tableau currentProduit.images
      const index = this.currentDrug.images.indexOf(img, 0);
      if (index > -1) {
      this.currentDrug.images.splice(index, 1);
      }
      });
      }


}
