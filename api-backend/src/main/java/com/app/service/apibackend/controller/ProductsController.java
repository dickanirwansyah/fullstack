package com.app.service.apibackend.controller;

import com.app.service.apibackend.model.ApiResponse;
import com.app.service.apibackend.model.ProductRequest;
import com.app.service.apibackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(value = {"*"})
@RequestMapping(value = "/api")
@RestController
public class ProductsController {

    @Autowired
    private ProductService productService;

    @PostMapping(value = "/products")
    public ResponseEntity<ApiResponse> save(@RequestBody ProductRequest request){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.builder()
                        .message("success")
                        .timestamp(new Date())
                        .data(productService.saveProduct(0l, request))
                        .build());
    }

    @PutMapping(value = "/products/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable("id")Long id,
                                                  @RequestBody ProductRequest request){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.builder()
                        .message("success")
                        .timestamp(new Date())
                        .data(productService.saveProduct(id, request))
                        .build());
    }

    @DeleteMapping(value = "/products/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable("id")Long id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.builder()
                        .message("success")
                        .timestamp(new Date())
                        .data(productService.delete(id))
                        .build());
    }

    @GetMapping(value = "/products/{id}")
    public ResponseEntity<ApiResponse> find(@PathVariable("id")Long id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.builder()
                        .message("success")
                        .timestamp(new Date())
                        .data(productService.find(id))
                        .build());
    }

    @GetMapping(value = "/products")
    public ResponseEntity<ApiResponse> finds(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.builder()
                        .message("success")
                        .timestamp(new Date())
                        .data(productService.finds(pageable))
                        .build());
    }
}
