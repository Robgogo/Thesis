package com.robgogo.ThesisProject;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;
    private String  name;
    private String location;
    private Float level;
    private Float flowRate;
    private Date timeOfReading;

    public Sensor() {
    }

    public Sensor(String name, String location, Float level, Float flowRate) {
        this.name = name;
        this.location = location;
        this.level = level;
        this.flowRate = flowRate;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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

    public Date getTimeOfReading() {
        return timeOfReading;
    }

    public void setTimeOfReading(Date timeOfReading) {
        this.timeOfReading = timeOfReading;
    }
}
