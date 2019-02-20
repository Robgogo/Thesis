package com.robgogo.ThesisProject;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SensorRepository extends CrudRepository<Sensor,Integer>{
    Sensor findByName(String name);
}
