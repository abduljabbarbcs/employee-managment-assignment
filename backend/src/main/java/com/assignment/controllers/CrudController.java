package com.assignment.controllers;

import com.assignment.models.Model;
import com.assignment.services.CrudService;
import org.springframework.data.repository.CrudRepository;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@RestController
public abstract class CrudController<M extends Model, S extends CrudService<M, ? extends CrudRepository<M,Long>>> {
    S service;

    public abstract void setService(S service);
    public abstract Boolean isAuthorized(S service);

    @RequestMapping(method = RequestMethod.POST)
    public  @ResponseBody M create(@RequestBody M object) {
        if(isAuthorized(service)) {
            return service.save(object);
        }
        logUnauthorizedAccess();
        return null;
    }

    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    public  @ResponseBody M update(@PathVariable("id") long id, @RequestBody M object) {
        if(isAuthorized(service)) {
            return service.update(id,object);
        }
        logUnauthorizedAccess();
        return null;
    }
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Boolean delete(@PathVariable("id") long id) {
        if(isAuthorized(service)) {
            return service.delete(id);
        }
        logUnauthorizedAccess();
        return null;
    }
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public @ResponseBody M get(@PathVariable("id") long id) {
        if(isAuthorized(service)) {
            return service.get(id);
        }
        return null;
    }

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody Iterable<M> getAll(ModelMap map) {
        if (isAuthorized(service))
        {
            return service.getAll();
        }
        return null;
    }

    public void logUnauthorizedAccess() {
        System.out.println("!!UN-AUTHORIZED ACCESS DETECTED!!");
    }
}
