import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDocumentComponent } from './components/view-document/view-document.component';

const routes: Routes = [

  {
    path: 'document/view/:id',
    component: ViewDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
