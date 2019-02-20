package com.robgogo.ThesisProject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface DataRepository extends CrudRepository<Data,Integer> {
    Page<Data> findBySensorId(Integer sensorId, Pageable pageable);
}
