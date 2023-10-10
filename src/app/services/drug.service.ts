import { Injectable } from '@angular/core';
import { Drugs } from 'src/model/drugs.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DrugClass } from 'src/model/DrugClass.model';
import { AuthService } from './auth.service';
import { DrugClassWrapped } from 'src/model/DrugClassWrapped';
import { Image } from 'src/model/Image.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class Drugservice {
  rechercherParNom(genericName: string) {
    throw new Error('Method not implemented.');
  }
  rechercheDrugGenericName(genericName: string): Drugs[] {
    throw new Error('Method not implemented.');
  }
  apiUrl = 'http://localhost:8888/drugs/api';
  apiURLd = 'http://localhost:8888/drugs/api/dclass';
  apiURLi = 'http://localhost:8888/drugs/api/image/upload';
  apiURLdel = 'http://localhost:8888/drugs/api/image';



  Drugs!: Drugs[]; // un tableaux de drug
  DrugClass!: DrugClass[]; // un tableaux de drugclass

  constructor(private http: HttpClient, private authService: AuthService) { }

  listeDrugs(): Observable<Drugs[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.get<Drugs[]>(this.apiUrl + "/all", { headers: httpHeaders });
  }

  ajouterDrug(prod: Drugs): Observable<Drugs> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Drugs>(this.apiUrl + "/adddrug", prod, { headers: httpHeaders });
  }

  supprimerDrug(id: number) {
    const url = `${this.apiUrl}/deldrug/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterDrug(id: number): Observable<Drugs> {
    const url = `${this.apiUrl}/getbyid/${id}`;
    console.log(url);
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Drugs>(url, { headers: httpHeaders });
  }

  updateDrug(prod: Drugs): Observable<Drugs> {
    console.log("prooooooooooood " + prod);
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Drugs>(this.apiUrl + "/updatedrug", prod, { headers: httpHeaders });
  }


  trierDrugs() {
    this.Drugs = this.Drugs.sort((n1, n2) => {
      if (n1.id! > n2.id!) {
        return 1;
      }
      if (n1.id! < n2.id!) {
        return -1;
      }
      return 0;
    });
  }

  listeDrugClass():Observable<DrugClassWrapped>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return  this.http.get<DrugClassWrapped>(this.apiURLd,{headers:httpHeaders});
    }


  consulterDrugClass(id: number): DrugClass {
    return this.DrugClass.find((d) => d.idcl == id)!;
  }

  rechercheDrugClass(idcla: number): Observable<Drugs[]> {
    const url = `${this.apiUrl}/drugclass/${idcla}`;
    return this.http.get<Drugs[]>(url);
  }

  rechercherParNomdrugs(genericName: string): Observable<Drugs[]> {
    const url = `${this.apiUrl}/genericname/${genericName}`;
    return this.http.get<Drugs[]>(url);
  }

  ajouterDrugClass(item: DrugClass): Observable<DrugClass> {
    return this.http.post<DrugClass>(this.apiURLd, item, httpOptions);
  }

  updateDrugClass(item: DrugClass): Observable<DrugClass> {
    return this.http.put<DrugClass>(this.apiURLd, item, httpOptions);
  }



    uploadImage(file: File, filename: string,): Observable<any>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURLdel + '/upload'}`;
      return this.http.post(url, imageFormData);
      }


    loadImage(id: number): Observable<Image> {
      const url = `${this.apiURLi + '/image/get/info'}/${id}`;
      return this.http.get<Image>(url);
      }






      supprimerImage(id : number) {
        const url = `${this.apiURLdel}/delete/${id}`;
        return this.http.delete(url, httpOptions);
        }
}
