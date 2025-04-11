import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { ListDocumentsComponent } from './components/list-documents/list-documents.component';
import { ViewDocumentComponent } from './components/view-document/view-document.component';

const routes: Routes = [
  {
    path: '',
    component:DashBoardComponent
  },
  {
    path: 'list',
    component:ListDocumentsComponent
  },
  {
    path: 'view',
    component:ViewDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
