import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogService } from './../service/catalog.service';
import { Component, OnInit, ViewChild } from '@angular/core';

interface Catalog{
    id: number;
    name: string;
    categoryId: number;
    price: number;
    qty: number;
}

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

    isLoading=false;
    pageSizeOptions:number[] = [5,10,25,100];
    displayColumns:string[] = ['id', 'name', 'categoryId','price','qty', 'details'];
    currentPage=0;
    totalElement: number =0;
    pageSize=5;

    element_catalog: Catalog[] = [];
    dataSource: MatTableDataSource<Catalog> = new MatTableDataSource();

    @ViewChild(MatPaginator)
    paginator!:MatPaginator;
    
    constructor(private catalogService:CatalogService, 
        private router:Router){}

    ngAfterViewInit(){
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        console.log("catalog component");
        this.loadData({page: "0", size: "5"});
    }

    nextPage(event: PageEvent){
        const request = {
            'page' : event.pageIndex.toString(),
            'size' : event.pageSize.toString()
        };
        this.loadData(request);
    }

    private loadData(request:any){
        this.isLoading=true;
        this.catalogService.search(request)
            .subscribe(data => {
                setTimeout(() => {
                console.log("all data catalog = "+JSON.stringify(data));
                this.element_catalog = data.data.content;
                this.totalElement = data.data.totalElements;
                console.log("element catalog = "+JSON.stringify(this.element_catalog));
                console.log("total element = "+JSON.stringify(this.totalElement));
                this.dataSource = data.data.content;
                this.isLoading=false
                },2000);
            },error => console.log(error.error));
    }

    linkTo(){
        this.router.navigate(['/add-catalog', 0]);
    }

    linkToEdit(request:number){
        this.router.navigate(['/add-catalog', request]);
    }

    deleteCatalog(request:number){
        this.catalogService.delete(request)
            .subscribe((response:any) => {
                this.loadData({page: "0", size: "5"});
            },error => console.log(error.error));
    }
}