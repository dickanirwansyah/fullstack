import { GlobalConstant } from './../constant/globalconstant';
import { SnackbarDialog } from './../snackbar/snackbar.dialog';
import { CategoryService } from './../service/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';


@Component({
    selector: 'app-addcategory',
    styleUrls: ['./add-category.component.css'],
    templateUrl : './add-category.component.html'
})
export class AddCategoryComponent implements OnInit{

    categoryForm:any = FormGroup;
    responseMessage:any;
    isLoading=false;
    myParams:any;

    constructor(
        private categoryService:CategoryService,
        private router:Router,
        private route:ActivatedRoute,
        private snackbarDialog:SnackbarDialog,
        private formBuilder:FormBuilder
        ){}

    ngOnInit(): void {
        console.log("add category component");
        this.categoryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required,Validators.pattern(GlobalConstant.nameRegex)]]
        });
        /** check param */
        this.route.params.subscribe((params: Params) => this.myParams = params['id']);
        console.log("params = "+this.myParams);
        if (this.myParams == 0){
            console.log("params is null");
        }else{
            this.detailCategory();
        }
    }

    detailCategory(){
        this.categoryService.find(this.myParams).subscribe(responseData => {
            console.log("data detail category = "+JSON.stringify(responseData));
            this.categoryForm.get('id')?.setValue(responseData.data.id);
            this.categoryForm.get('name')?.setValue(responseData.data.name);
        },error => {
            this.snackbarDialog.openSnackbar(error.error, "error");
        });
    }

    handleSubmit(){
        this.isLoading=true;
        var formDataValue = this.categoryForm.value;
        var requestSave = {
            name: formDataValue.name
        }
        var requestUpdate = {
            id: formDataValue.id,
            name: formDataValue.name
        }
        /** handling save */
        if (this.myParams == 0){
            console.log("save data");
            this.categoryService.save(requestSave)
            .subscribe((response:any) => {
                setTimeout(() => {
                    this.responseMessage = response?.message;
                    this.snackbarDialog.openSnackbar(this.responseMessage, "");
                    this.isLoading=false;
                    this.router.navigate(['/category']);
                }, 2000);
            }, (error) => {
                if (error.error?.message){
                    this.responseMessage = error.error?.message;
                }else{
                    this.responseMessage = GlobalConstant.genericError;
                }
                this.snackbarDialog.openSnackbar(this.responseMessage, "error");
            });
        }else{
            console.log("update data");
            this.categoryService.save(requestUpdate).subscribe((response:any) => {
                setTimeout(()=> {
                    this.responseMessage = response?.message;
                    this.snackbarDialog.openSnackbar(this.responseMessage, "");
                    this.isLoading=false;
                    this.router.navigate(['/category']);
                }, 2000);
            }, (error) => {
                if (error.error?.message){
                    this.responseMessage = error.error?.message;
                }else{
                    this.responseMessage = GlobalConstant.genericError;
                }
                this.snackbarDialog.openSnackbar(this.responseMessage, "error");
            })
        }
        
    }

}