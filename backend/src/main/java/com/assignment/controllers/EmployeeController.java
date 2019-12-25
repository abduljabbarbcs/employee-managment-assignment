package com.assignment.controllers;

import com.assignment.models.Employee;
import com.assignment.services.EmployeeService;
//import io.swagger.annotations.Api;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/employee")
@Api
public class EmployeeController extends CrudController<Employee, EmployeeService> {
    @Autowired
    @Override
    public  void setService(EmployeeService service)
    {
        this.service=service;
    };
    public  Boolean isAuthorized( EmployeeService service)
    {
        return service.isAuthorized();
    }
}
