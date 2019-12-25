package com.assignment.repositories;

import com.assignment.models.Department;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;


@Repository
public interface DepartmentRepository extends PagingAndSortingRepository<Department, Long> {
}
