package com.assignment.models;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Model {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Long id;

    private Date dateCreated;

    private Date dateModified;

    @PrePersist
    void createdAt() {
        this.setDateCreated(new Date());
    }

    @PreUpdate
    void onPersist() {
        this.setDateModified(new Date());
    }

    private boolean active = true;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateModified() {
        return dateModified;
    }

    public void setDateModified(Date dateModified) {
        this.dateModified = dateModified;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean getActive(){
        return this.active;
    }
}
