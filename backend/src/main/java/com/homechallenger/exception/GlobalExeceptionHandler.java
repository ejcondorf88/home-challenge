package com.homechallenger.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDate;

@ControllerAdvice
public class GlobalExeceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionDetails> handleResourceNotFoundException(Exception exception, WebRequest request) {
        ExceptionDetails exceptionDetails = new ExceptionDetails(LocalDate.now(), exception.getMessage(),  request.getDescription(false));
        return new ResponseEntity<>(exceptionDetails , HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionDetails> handleBadRequestException(Exception exception, WebRequest request) {
        ExceptionDetails exceptionDetails = new ExceptionDetails(LocalDate.now(), exception.getMessage(),  request.getDescription(false));
        return new ResponseEntity<>(exceptionDetails , HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDetails> handleGlobalException(Exception exception, WebRequest request) {
        ExceptionDetails exceptionDetails = new ExceptionDetails(LocalDate.now(), exception.getMessage(),  request.getDescription(false));
        return new ResponseEntity<>(exceptionDetails , HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
