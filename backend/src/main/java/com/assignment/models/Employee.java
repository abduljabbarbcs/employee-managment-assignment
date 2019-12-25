package com.assignment.models;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Entity
@Table(name = "Employees")
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE, fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Employee extends Model {
    @NotEmpty
    private String firstName;

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return firstName;
    }

    @NotEmpty
    private String lastName;

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }

    @Email
    private String email;

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    @Pattern(regexp="(^$|[0-9]{10})")
    private String phoneNumber;

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    private Date hireDate;

    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }

    public Date getHireDate() {
        return hireDate;
    }

    private int salary;

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getSalary() {
        return salary;
    }


//    @Column(name = "manager_id")
//    private Long managerId;
//
//    public void setManagerId(Long managerId) {
//        this.managerId = managerId;
//    }
//
//    public Long getManagerId() {
//        return managerId;
//    }
//
//    @OneToMany(mappedBy="manager")
//    private Set<Employee> employees;
//
//    public Set<Employee> getEmployees() {
//        return employees;
//    }
//    public void setEmployees(Set<Employee> employees) {
//        this.employees = employees;
//    }
//    @ManyToOne(cascade={CascadeType.ALL})
//    @JoinColumn(name="manager_id", insertable = false, updatable = false)
//    private Employee manager;
//
//
//    public Employee getManager() {
//        return manager;
//    }
//
//    public void setManager(Employee manager) {
//        this.manager = manager;
//    }

    @ManyToOne(cascade={CascadeType.ALL})
    @JoinColumn(name="department_id")
    private Department department;

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Department getDepartment() {
        return department;
    }
}