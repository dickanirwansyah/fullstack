import { OnInit, Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { ProductService } from "src/app/service/product.service";


@Component({
    selector: 'app-add-products',
    styleUrls: ['./add-products.component.css'],
    templateUrl: './add-products.component.html'
})
export class AddProductsComponent implements OnInit{

    productForm:any = FormGroup;
    responseMessage:any;
    isLoading=false;
    myParams:any;

    constructor(private productService:ProductService,
        private router:Router,
        private routes:ActivatedRoute,
        private formBuilder:FormBuilder){

    }

    ngOnInit(): void {
        console.log("add products");
        this.productForm = this.formBuilder.group({
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            category: [null, [Validators.required]],
            brand: [null, [Validators.required]],
            type: [null, [Validators.required]],
            description: [null, [Validators.required]]
        });
        /** check params */
        this.routes.params.subscribe((params: Params) => this.myParams = params['id']);
        console.log("my params products = "+this.myParams);
        if (this.myParams != 0){
            console.log("params bring id is not 0");
        }
    }

    handleSubmit(){
        var formDataValue = this.productForm.value;
        var requestSave = {
            code: formDataValue.code,
            name: formDataValue.name,
            category: formDataValue.category,
            brand: formDataValue.brand,
            type: formDataValue.type,
            description: formDataValue.description
        }

        if (this.myParams == 0){
            console.log("save data catalog");
            this.productService.save(requestSave).subscribe((response:any) => {
                setTimeout(() => {
                    this.responseMessage = response?.message;
                    this.isLoading=false;
                    this.router.navigate(['/product']);
                }, 200);
            }, (error) => {
                if (error.error?.message){
                    this.responseMessage = error.error?.message;
                    console.log("error = "+this.responseMessage);
                }else{
                    this.responseMessage = "Something went wrong";
                    console.log("error = "+this.responseMessage);
                }
            })
        }
    }

}