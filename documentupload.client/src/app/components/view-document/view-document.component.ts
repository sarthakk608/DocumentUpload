import { Component, OnInit } from '@angular/core';
import { IDocument } from '../../models/document';
import { DocumentService } from '../../services/document.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-document',
  standalone: false,
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.css'
})
export class ViewDocumentComponent implements OnInit{


  myImage: boolean = false;
  //myFile!: Blob;
  docUrl: string = '';
  myFileType: string = '';
  previewSrc: string ='';

  previewType: 'google' | 'office' | 'pdf'  = 'google';


  constructor(private _docService: DocumentService, private _route: ActivatedRoute, private _http: HttpClient) { }

  ngOnInit() {
    this._route.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        //console.log(id);
        if (id) {
          //this._docService.getDocument(id).subscribe({
          //  next: document => {
          //    this.myFile = document;
          //    this.myFileType = document.type;
          //    const fileUrl = URL.createObjectURL(document);
          //    console.log("File URL .........",fileUrl);
          //    // Use MIME type to decide how to handle the preview
          //    if (this.myFileType.startsWith('image/')) {
          //      this.previewType = 'image';
          //      this.previewSrc = fileUrl;
          //    } else if (this.myFileType === 'application/pdf') {
          //      this.previewType = 'pdf';
          //      this.previewSrc = fileUrl;
          //    } else {
          //      this.previewType = 'download';
          //      this.previewSrc = fileUrl;
          //    }
          //  },
          //  error: err => console.log(err)
          //});

          this._docService.getDocument(id).subscribe({
            next: (document: Blob) => {
              //this.myFile = document;
              this.myFileType = document.type;

              const fileUrl = URL.createObjectURL(document);
              console.log("File URL .........", fileUrl);
              console.log("File Type .........", this.myFileType);

              // Set preview type based on MIME
              if (this.myFileType.startsWith('image/')) {
                this.previewType = 'google';
                this.myImage = true;
              } else if (this.myFileType === 'application/pdf' ) {
                this.previewType = 'pdf';
              } else if (this.myFileType.includes('xlsx') || this.myFileType.includes('pptx') || this.myFileType.includes('docx')){
                this.previewType = 'office';
              }

              this.previewSrc = fileUrl;
            },
            error: err => console.error(err)
          });


          //this._http.get(`api/download/${id}`, { responseType: 'blob' }).subscribe(blob => {
          //  const reader = new FileReader();
          //  reader.onload = () => {
          //    this.docUrl = reader.result. as string;
          //  };
          //  reader.readAsDataURL(blob);
          //});

          
            //this._http.get(`api/document/view/${id}`, {
            //  responseType: 'blob',
            //  observe: 'response'
            //}).subscribe(response => {
            //  const blob = response.body!;
            //  const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
            //  const fileUrl = URL.createObjectURL(blob);

            //  // Use MIME type to decide how to handle the preview
            //  if (contentType.startsWith('image/')) {
            //    this.previewType = 'image';
            //    this.previewSrc = fileUrl;
            //  } else if (contentType === 'application/pdf') {
            //    this.previewType = 'pdf';
            //    this.previewSrc = fileUrl;
            //  } else {
            //    this.previewType = 'download';
            //    this.previewSrc = fileUrl;
            //  }
            //});
          



        }
      }
    });
   
    //console.log(this.myFile);

  }

 

}
