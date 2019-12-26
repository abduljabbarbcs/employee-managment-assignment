package com.assignment.models;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.hibernate.validator.constraints.NotEmpty;
import javax.validation.constraints.Size;
import javax.persistence.*;

@Entity
@Table(name = "Departments")
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE, fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Department extends Model {
    @NotEmpty
    @Size(min=2)
    private String departmentName;

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    @ManyToOne
    @JoinColumn(name="manager_id")
    private Employee manager;

    public Employee getManager() {
        return  this.manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }

}
