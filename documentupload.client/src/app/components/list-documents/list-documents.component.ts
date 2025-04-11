import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { IDocument } from '../../models/document';
import { Config } from 'datatables.net'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-documents',
  standalone: false,
  templateUrl: './list-documents.component.html',
  styleUrl: './list-documents.component.css'
})
export class ListDocumentsComponent implements OnInit{

  documentData: IDocument[] = [];
  //dtOptions: Config = {}

  constructor(private _documentService: DocumentService, private datePipe: DatePipe) { }

    ngOnInit(): void {

      //this.dtOptions = {
      //  pagingType: 'full_numbers',
      //  lengthChange: true,
      //  lengthMenu: [5, 10, 15, 20, 25],
      //  searching: true
      //}
    
      this._documentService.getAllDocuments().subscribe({
        next: (docData) => {
          console.log(docData);
          this.documentData = docData;
        },
        error: (err) => console.log(err)
      });

  }

  filter_date(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy HH:mm:ss') || 'Invalid Date';
  }



}
