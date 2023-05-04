import { GlobalConstant } from './../constant/globalconstant';
import { SnackbarDialog } from './../snackbar/snackbar.dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CatalogService } from './../service/catalog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-add-catalog',
    styleUrls: ['./add-catalog.component.css'],
    templateUrl: './add-catalog.component.html'
})
export class AddCatalogComponent implements OnInit{

    catalogForm:any = FormGroup;
    responseMessage:any;
    isLoading=false;
    myParams:any;

    constructor(private catalogService:CatalogService,
        private router:Router,
        private route:ActivatedRoute,
        private snackbarDialog:SnackbarDialog,
        private formBuilder:FormBuilder){}

    ngOnInit(): void {
        console.log("add catalog component");
        this.catalogForm = this.formBuilder.group({
            id: [null],
            idProductDetail: [null],
            name: [null, [Validators.required, Validators.pattern(GlobalConstant.nameRegex)]],
            categoryId: [null, Validators.required],
            price: [null, Validators.required],
            qty: [null, Validators.required],
            skuNumber: [null, Validators.required],
            barcodeNumber: [null, Validators.required]
        });
        /** check params */
        this.route.params.subscribe((params: Params) => this.myParams = params['id']);
        console.log("my params catalog = "+this.myParams);
        if (this.myParams != 0){
            this.detailCatalog();
        }
    }

    detailCatalog(){
        this.catalogService.find(this.myParams)
            .subscribe(responseData => {
                console.log("response data detail product = "+JSON.stringify(responseData));
                this.catalogForm.get('id')?.setValue(responseData.data.product.id);
                this.catalogForm.get('idProductDetail')?.setValue(responseData.data.productDetail.id);
                this.catalogForm.get('name')?.setValue(responseData.data.product.name);
                this.catalogForm.get('price')?.setValue(responseData.data.product.price);
                this.catalogForm.get('qty')?.setValue(responseData.data.product.qty);
                this.catalogForm.get('categoryId')?.setValue(responseData.data.product.categoryId);
                this.catalogForm.get('skuNumber')?.setValue(responseData.data.productDetail.skuNumber);
                this.catalogForm.get('barcodeNumber')?.setValue(responseData.data.productDetail.barcodeNumber);
            },error => console.log(error));
    }

    handleSubmit(){
        this.isLoading=true;
        var formDataValue = this.catalogForm.value;
        var requestSave = {
            product: {
                name: formDataValue.name,
                categoryId: formDataValue.categoryId,
                price: formDataValue.price,
                qty: formDataValue.qty
            },
            productDetail: {
                image: null,
                skuNumber: formDataValue.skuNumber,
                barcodeNumber: formDataValue.barcodeNumber
            }
        }

        var requestUpdate = {
            product: {
                id: formDataValue.id,
                name: formDataValue.name,
                categoryId: formDataValue.categoryId,
                price: formDataValue.price,
                qty: formDataValue.qty
            },
            productDetail: {
                id: formDataValue.idProductDetail,
                image: null,
                skuNumber: formDataValue.skuNumber,
                barcodeNumber: formDataValue.barcodeNumber
            }
        }

        console.log("data request catalog = "+JSON.stringify(requestSave));
        if (this.myParams == 0){
            console.log("save data catalog");
            this.catalogService.save(requestSave).subscribe((response:any) => {
                setTimeout(() => {
                    this.responseMessage = response?.message;
                    this.snackbarDialog.openSnackbar(this.responseMessage, "");
                    this.isLoading=false;
                    this.router.navigate(['/catalog']);
                }, 200);
            }, (error) => {
                if (error.error?.message){
                    this.responseMessage = error.error?.message;
                }else{
                    this.responseMessage = GlobalConstant.genericError;
                }
                this.snackbarDialog.openSnackbar(this.responseMessage, "error");
            })
        }else{
            console.log("update data catalog");
            this.catalogService.save(requestUpdate).subscribe((response:any) => {
                setTimeout(() => {
                    this.responseMessage = response?.message;
                    this.snackbarDialog.openSnackbar(this.responseMessage, "");
                    this.isLoading=false;
                    this.router.navigate(['/catalog']);
                }, 200);
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