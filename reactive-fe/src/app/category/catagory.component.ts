import { SnackbarDialog } from './../snackbar/snackbar.dialog';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../service/category.service';


interface Category {
    id: number;
    name: string;
    activated: string;
}

@Component({
    selector: 'app-category',
    styleUrls: ['./category.component.css'],
    templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit{

    isLoading=false;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    displayColumns: string[] = ['id', 'name', 'activated', 'details'];
    currentPage=0;
    totalElement: number = 0;
    pageSize=5;

    element_category: Category[] = [];
    dataSource: MatTableDataSource<Category> = new MatTableDataSource();

    @ViewChild(MatPaginator)
    paginator!:MatPaginator;

    constructor(private categoryService:CategoryService,
        private snackbarDialog:SnackbarDialog,
        private router:Router){}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        console.log("category component");
        this.loadData({page: "0", size: "5"});
    }

    private loadData(request:any){
        this.isLoading=true;
        this.categoryService.search(request)
            .subscribe(data => {
                setTimeout(() => {
                console.log("all data category = "+JSON.stringify(data));
                this.element_category = data.data.content;
                this.totalElement = data.data.totalElements;
                console.log("element category = "+JSON.stringify(this.element_category));
                console.log("total element = "+JSON.stringify(this.totalElement));
                this.dataSource = data.data.content;
                this.isLoading=false
                },2000);
            },error => console.log(error.error));
    }
    
    deleteCategoryById(request:number){
        this.isLoading=true;
        this.categoryService.delete(request)
            .subscribe(response => {
                setTimeout(() => {
                    let responseMessage = response.message;
                    console.log("sucessfully delete data ="+JSON.stringify(response));
                    this.isLoading=false;  
                    this.loadData({page: "0", size: "5"});
                    this.snackbarDialog.openSnackbar(responseMessage, "");
                },2000)
            }, error => console.log(error.error));
    }

    nextPage(event: PageEvent){
        const request = {
            'page' : event.pageIndex.toString(),
            'size' : event.pageSize.toString()
        };
        this.loadData(request);
    }

    linkto(){
        this.router.navigate(['/add-category', 0]);
    }

    linkToEdit(request:number){
        this.router.navigate(['/add-category', request]);
    }
}
