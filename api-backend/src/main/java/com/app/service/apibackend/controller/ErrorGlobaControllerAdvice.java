package com.app.service.apibackend.controller;

import com.app.service.apibackend.exception.MessageException;
import com.app.service.apibackend.model.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@Slf4j
@RestControllerAdvice
public class ErrorGlobaControllerAdvice {

    @ExceptionHandler(MessageException.class)
    public ResponseEntity<ApiResponse> errorAdvice(MessageException exception){
        log.error("error because = {} ",exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.builder()
                        .timestamp(new Date())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(exception.getMessage())
                        .build());
    }
}
