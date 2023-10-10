import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// add forms module
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrugsComponent } from './drugs/drugs.component';
import { AddDrugsComponent } from './add-drugs/add-drugs.component';
import { UpdateDrugComponent } from './update-drug/update-drug.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchDrugsClassComponent } from './search-drugs-class/search-drugs-class.component';
import { SearchNameComponent } from './search-name/search-name.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeDrugsClassComponent } from './liste-drugs-class/liste-drugs-class.component';
import { UpdateDrugClassComponent } from './update-drug-class/update-drug-class.component';
import { TokenInterceptor } from './services/token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    DrugsComponent,
    AddDrugsComponent,
    UpdateDrugComponent,
    LoginComponent,
    ForbiddenComponent,
    SearchDrugsClassComponent,
    SearchNameComponent,
    SearchFilterPipe,
    ListeDrugsClassComponent,
    UpdateDrugClassComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
     ],

  bootstrap: [AppComponent],
})
export class AppModule {}
