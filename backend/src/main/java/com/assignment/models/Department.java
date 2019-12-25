package com.assignment.models;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.hibernate.validator.constraints.NotEmpty;
import javax.persistence.*;

@Entity
@Table(name = "Departments")
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE, fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Department extends Model {
    @NotEmpty
    private String departmentName;

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

//    @ManyToOne(cascade={CascadeType.ALL})
//    @JoinColumn(name="manager_id")
//    private Employee manager;
//
//    public Employee getManager() {
//        return manager;
//    }
//
//    public void setManager(Employee manager) {
//        this.manager = manager;
//    }

}
