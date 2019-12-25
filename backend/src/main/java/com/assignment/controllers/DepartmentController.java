package com.assignment.controllers;

import com.assignment.services.DepartmentService;
//import io.swagger.annotations.Api;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.assignment.models.Department;

@RestController
@RequestMapping("/api/department")
@Api
public class DepartmentController extends CrudController<Department,DepartmentService> {
    @Autowired
    @Override
    public  void setService(DepartmentService service)
    {
        this.service=service;
    };
    public  Boolean isAuthorized( DepartmentService service)
    {
        return service.isAuthorized();
    }
}
