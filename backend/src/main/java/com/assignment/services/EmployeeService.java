package com.assignment.services;

import com.assignment.models.Employee;
import com.assignment.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EmployeeService extends CrudService<Employee, EmployeeRepository> {
    @Autowired
    @Override
    public void setRepo(EmployeeRepository repo)
    {
        this.repo=repo;
    }


    /**
     * Define the parameters that you want to save to the DB when calling the update() method
     * @param from source object
     * @param to DB object that gets saves, "return to" in this method
     * @return
     */
    @Override
    public  Employee copy(Employee from, Employee to)
    {
        to=from;
        return to;
    }
    public  Boolean isAuthorized()
    {
        return true;
    }
}
