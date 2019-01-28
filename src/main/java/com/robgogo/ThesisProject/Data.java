package com.robgogo.ThesisProject;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Data {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;
    private Float level;
    private Float flowRate;
    private Date timeOfReading;

    public Data(Integer id, Float level, Float flowRate, Date timeOfReading) {
        Id = id;
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
