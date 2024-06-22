import { SumBrandComponent } from './components/sum-brand/sum-brand.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAutoComponent } from './components/add-auto/add-auto.component';
import { ListAutoComponent } from './components/list-auto/list-auto.component';

export const routes: Routes = [
  {path: '', redirectTo: 'listauto', pathMatch: 'full'},
  {path: 'listauto', component: ListAutoComponent},
  {path: 'addauto', component: AddAutoComponent},
  {path: 'sumbrand', component: SumBrandComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
