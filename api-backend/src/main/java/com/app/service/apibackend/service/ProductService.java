package com.app.service.apibackend.service;

import com.app.service.apibackend.entity.Products;
import com.app.service.apibackend.exception.MessageException;
import com.app.service.apibackend.model.ProductRequest;
import com.app.service.apibackend.model.ProductResponse;
import com.app.service.apibackend.model.ValidationResponse;
import com.app.service.apibackend.repository.ProductsRepository;
import com.app.service.apibackend.util.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

@Slf4j
@Service
public class ProductService {

    @Autowired
    private ProductsRepository productsRepository;

    public ProductResponse saveProduct(Long id, ProductRequest request){
        if (Objects.isNull(id) || id == 0){
            log.info("create data");
            this.doValidate(request);
            Products products = new Products();
            products.setCode(request.getCode());
            products.setName(request.getName());
            products.setCategory(request.getCategory());
            products.setBrand(request.getBrand());
            products.setDescription(request.getDescription());
            products.setType(request.getType());
            products.setCreatedDate(LocalDateTime.now());
            products.setDeleted(Constants.NEW);
            Products responseProduct = productsRepository.save(productsRepository.save(products));
            log.info("success create data");
            return ProductResponse.builder()
                    .id(responseProduct.getId())
                    .brand(responseProduct.getBrand())
                    .category(responseProduct.getCategory())
                    .name(responseProduct.getName())
                    .code(responseProduct.getCode())
                    .type(responseProduct.getType())
                    .description(responseProduct.getDescription())
                    .createdDate(responseProduct.getCreatedDate())
                    .build();
        }else {
            log.info("update data");
            return productsRepository.findById(id)
                    .map(currentProduct -> {
                        currentProduct.setType(request.getType());
                        currentProduct.setCategory(request.getCategory());
                        currentProduct.setBrand(request.getBrand());
                        currentProduct.setName(request.getName());
                        currentProduct.setDescription(request.getDescription());
                        currentProduct.setUpdatedDate(LocalDateTime.now());
                        Products responseProduct = productsRepository.save(currentProduct);
                        log.info("success update data");

                        return ProductResponse.builder()
                                .id(responseProduct.getId())
                                .name(responseProduct.getName())
                                .brand(responseProduct.getBrand())
                                .updatedDate(responseProduct.getUpdatedDate())
                                .createdDate(responseProduct.getCreatedDate())
                                .description(responseProduct.getDescription())
                                .type(responseProduct.getType())
                                .code(responseProduct.getCode())
                                .category(responseProduct.getCategory())
                                .build();
                    }).orElseThrow(() -> new MessageException("id product not found"));
        }
    }

    public ValidationResponse delete(Long id){
        log.info("delete product by id = {} ",id);
        this.productsRepository.findById(id)
                .ifPresentOrElse(currentProduct -> {
                    productsRepository.delete(currentProduct);
                    log.info("success delete product");
                }, ()-> {
                    log.error("error because id product not found");
                    throw new MessageException("id product not found");
                });
        return ValidationResponse.builder()
                .valid(true)
                .build();
    }

    public Page<Products> finds(Pageable pageable){
        log.info("finds product with pageable");
        return productsRepository.findAll(pageable);
    }

    public ProductResponse find(Long id){
        log.info("find product byd id = {} ",id);
        if (Objects.isNull(id) || id == 0){
            log.info("id request is invalid");
            throw new MessageException("id request is invalid");
        }
        return productsRepository.findById(id)
                .map(data -> ProductResponse.builder()
                        .id(data.getId())
                        .name(data.getName())
                        .brand(data.getBrand())
                        .category(data.getCategory())
                        .code(data.getCode())
                        .type(data.getType())
                        .description(data.getDescription())
                        .createdDate(data.getCreatedDate())
                        .updatedDate(data.getUpdatedDate())
                        .build())
                .orElseThrow(() -> new MessageException("id product not found"));
    }

    private void doValidate(ProductRequest request){
        if (request.getName().isEmpty() || Objects.isNull(request.getName())){
            log.error("error name cannot be null");
            throw new MessageException("name cannot be null");
        }

        if (request.getType().isEmpty() || Objects.isNull(request.getType())){
            log.error("error type cannot be null");
            throw new MessageException("type cannot be null");
        }

        if (request.getBrand().isEmpty() || Objects.isNull(request.getBrand())){
            log.error("error brand cannot be null");
            throw new MessageException("brand cannot be null");
        }

        if (request.getCategory().isEmpty() || Objects.isNull(request.getCategory())){
            log.error("error category cannot be null");
            throw new MessageException("category cannot be null");
        }

        if (request.getDescription().isEmpty() || Objects.isNull(request.getDescription())){
            log.error("error description cannot be null");
            throw new MessageException("description cannot be null");
        }
    }
}
