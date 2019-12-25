package com.assignment.services;

import com.assignment.models.Department;
import com.assignment.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class DepartmentService extends CrudService<Department, DepartmentRepository> {
    @Autowired
    @Override
    public void setRepo(DepartmentRepository repo)
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
    public  Department copy(Department from, Department to)
    {
        to=from;
        return to;
    }
    public  Boolean isAuthorized()
    {
        return true;
    }
}
