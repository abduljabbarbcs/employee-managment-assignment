package com.assignment.services;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public abstract class CrudService<M extends com.assignment.models.Model, R extends PagingAndSortingRepository<M, Long>> {
    R repo;

    public abstract void setRepo(R repo);

    /**
     * Define the parameters that you want to save to the DB when calling the update() method
     * @param from source object
     * @param to DB object that gets saves, "return to" in this method
     * @return
     */
    public abstract M copy(M from, M to);


    public Iterable<M> getAll(Pageable pageable) {

        return this.repo.findAll(pageable);
    }

    /**
     * Mainly used to create a new entity
     * however, can also be used to save something without using the
     * update() method.
     * @param model
     * @return saved entity model
     */
    public M save(M model) {
        return this.repo.save(model);
    }

    public Iterable<M> save(Iterable<M> model) {
        return this.repo.saveAll(model);
    }

    public M get(Long id) {
        return this.repo.findById(id).orElse(null);
    }

    public M update(Long id,M model) {
        M updated = this.repo.findById(id).orElse(null);;
        updated = copy(model, updated);
        return this.repo.save(updated);
    }

    public Boolean delete(Long id) {
        try {
            M model = this.repo.findById(id).orElse(null);
            model.setActive(false);
            this.repo.save(model);
        }
        catch(Exception e)
        {
            return false;
        }
        return true;
    }
}
