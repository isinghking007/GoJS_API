import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { provideRoutes } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

   url="http://localhost:5194/Api/Home/"
  constructor(private http:HttpClient) { }

  //#region Get Methods
  // getDemo():Observable<any>{
  //   return this.http.get<any>(this.url+"demo");
  // }
  getDemoNodeToArray():Observable<any>
  {
    return this.http.get<any>(this.url+"DemoNodeToArray");
  }
  getNodeDataArray():Observable<any>{
    return this.http.get<any>(this.url+"NodeDataArray");
  }
  getLinkDataArray():Observable<any>{
    return this.http.get<any>(this.url+"LinkdataArrayNew");
  }
  //#endregion Get Methods

  //#region  Post Methods

  addWorkingNodeArray(data:any[]):Observable<any>{
    return this.http.post(this.url+"working",data);
  }
  addLinkArray(data:any[]):Observable<any>
  {
    console.log("from service",data)
    return this.http.post(this.url+"linkarray1",data);
  }
  addLinkToNode(data:any[]):Observable<any>
  {
    
    return this.http.post(this.url+'linkArray',data);
  }
  //#endregion Post Methods
}
