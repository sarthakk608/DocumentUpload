import { Component } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-upload-document',
  standalone: false,
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.css'
})
export class UploadDocumentComponent {
  selectedFile!: File;
  //type: string = '';
  //uploaddate: string = '';

  constructor(private docService: DocumentService) { }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    //if (!this.selectedFile || !this.type || !this.uploaddate) {
    //  alert('All fields are required');
    //  return;
    //}

    const formData = new FormData();
    formData.append('File', this.selectedFile);
    //formData.append('Type', this.type);
    //formData.append('Date', this.uploaddate);

    this.docService.uploadDocument(formData).subscribe({
      next: () => alert('Upload successful!'),
      error: err => console.error('Upload error', err)
    });
  }
}
