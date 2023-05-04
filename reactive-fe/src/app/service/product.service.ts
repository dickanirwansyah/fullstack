import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root' 
})
export class ProductService{
    
    private baseUrl = 'http://localhost:8888';

    constructor(private httpClient:HttpClient){}

    public save(request:any):Observable<any>{
        return this.httpClient.post(this.baseUrl+'/api/products', request);
    }

    public finds(request:any):Observable<any>{
        const params = request;
        return this.httpClient.get(this.baseUrl+'/api/products', {params});
    }

    public update(id:number, request:any):Observable<any>{
        return this.httpClient.put(this.baseUrl+'/api/products/'+id, request);
    }

    public delete(id:number):Observable<any>{
        return this.httpClient.delete(this.baseUrl+'/api/products/'+id);
    }

}