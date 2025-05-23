import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListDocumentsComponent } from './components/list-documents/list-documents.component';
import { ViewDocumentComponent } from './components/view-document/view-document.component';

import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DataTablesModule } from 'angular-datatables';
import { UploadDocumentComponent } from './components/upload-document/upload-document.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    ListDocumentsComponent,
    ViewDocumentComponent,

    DashBoardComponent,

    UploadDocumentComponent

  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, DataTablesModule,
    AppRoutingModule, NgxDocViewerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
