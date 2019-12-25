package com.assignment.repositories;

import com.assignment.models.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;


@Repository
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {
}
