import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private basUri = "http://localhost:10000/catalog";

    constructor(private http:HttpClient){}

    public search(request:any): Observable<any> {
        const params = request;
        console.log("request params = "+JSON.stringify(params));
        return this.http.get(this.basUri+'/api/v1/category/search', {params});
    }

    public save(request:any):Observable<any> {
        console.log("request save category = "+JSON.stringify(request));
        return this.http.post(this.basUri+'/api/v1/category/save', request);
    }

    public find(request:any): Observable<any>{
        console.log("request find category byd id = "+JSON.stringify(request));
        return this.http.get(this.basUri+'/api/v1/category/find/'+request);
    }

    public delete(request:any): Observable<any> {
        console.log("request find to delete category by id = "+JSON.stringify(request));
        return this.http.delete(this.basUri+'/api/v1/category/delete/'+request);
    }
}