package com.robgogo.ThesisProject;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Date;

@Entity
public class Data {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;
    @NotNull
    private Float level;
    @NotNull
    private Float flowRate;
    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss",timezone = "GMT+3")
    private Timestamp timeOfReading;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "sensorId",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Sensor sensor;

    public Data(){}


    public Data( Float level, Float flowRate, Timestamp timeOfReading) {
        this.level = level;
        this.flowRate = flowRate;
        this.timeOfReading = timeOfReading;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public Float getLevel() {
        return level;
    }

    public void setLevel(Float level) {
        this.level = level;
    }

    public Float getFlowRate() {
        return flowRate;
    }

    public void setFlowRate(Float flowRate) {
        this.flowRate = flowRate;
    }

    public Timestamp getTimeOfReading() {
        return timeOfReading;
    }

    public void setTimeOfReading(Timestamp timeOfReading) {
        this.timeOfReading = timeOfReading;
    }
}
