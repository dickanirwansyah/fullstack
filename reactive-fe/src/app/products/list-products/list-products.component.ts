import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ProductService } from "src/app/service/product.service";

interface Products {
    id:number;
    code:string;
    category:string;
    brand:string;
    type:string;
    description:string;
}

@Component({
    selector: 'app-list-products',
    styleUrls: ['./list-product.component.css'],
    templateUrl: './list-products.component.html'
})
export class ListProductsComponent implements OnInit{

    isLoading=false;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    displayColumns: string[] = ['id', 'code', 'name', 'category', 'brand', 'type', 'description', 'actions'];
    currentPage=0;
    totalElement: number = 0;
    pageSize=5;

    element_products:Products[] = [];
    dataSource: MatTableDataSource<Products> = new MatTableDataSource();

    @ViewChild(MatPaginator)
    paginator!:MatPaginator;

    constructor(private productService:ProductService,
        private router:Router){}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        console.log("list product component");
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
        this.productService.finds(request)
            .subscribe(data => {
                setTimeout(() => {
                console.log("all data products = "+JSON.stringify(data));
                this.element_products = data.data.content;
                this.totalElement = data.data.totalElements;
                console.log("element products = "+JSON.stringify(this.element_products));
                console.log("total element = "+JSON.stringify(this.totalElement));
                this.dataSource = data.data.content;
                this.isLoading=false
                },2000);
            },error => console.log(error.error));
    }

    linkto(){
        this.router.navigate(['/add-products', 0]);
    }

    delete(id:number){
        this.productService.delete(id)
            .subscribe(data => {
                window.location.reload();
            })
    }

}
