import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    private baseUrl = 'http://localhost:10000/catalog';

    constructor(private httpClient:HttpClient){}

    public search(request:any):Observable<any>{
        const params = request;
        console.log("request params = "+JSON.stringify(params));
        return this.httpClient.get(this.baseUrl+'/api/v1/product/search',{params});
    }

    public save(request:any):Observable<any>{
        console.log("request save product = "+JSON.stringify(request));
        return this.httpClient.post(this.baseUrl+'/api/v1/product/save',request);
    }

    public find(request:any):Observable<any> {
        console.log("request find product by id = "+JSON.stringify(request));
        return this.httpClient.get(this.baseUrl+'/api/v1/product/find/'+request);
    }

    public delete(request:any):Observable<any> {
        console.log("request find product by id = "+JSON.stringify(request));
        return this.httpClient.delete(this.baseUrl+'/api/v1/product/delete/'+request);
    }
}