import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocument } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  baseApi: string = 'https://localhost:7113/api/Document';

  constructor(private _http: HttpClient) { }

  getAllDocuments(): Observable<IDocument[]> {
    return this._http.get<IDocument[]>(this.baseApi);
  }

  getDocument(id: string): Observable<IDocument> {
    return this._http.get<IDocument>(this.baseApi + '/view/' + id);
  }

  addDocument(addDocumentRequest: IDocument): Observable<IDocument> {
    //addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
    return this._http.post<IDocument>(
      this.baseApi + '/upload',
      addDocumentRequest
    );


  }
}
