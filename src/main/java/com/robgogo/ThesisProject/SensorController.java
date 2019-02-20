package com.robgogo.ThesisProject;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
//@RequestMapping("/api")
public class SensorController {

    @Autowired
    SensorRepository sensorRepository;

//    @GetMapping("/data")
    public @ResponseBody Iterable<Sensor> getAllSensor(){
        return sensorRepository.findAll();
    }

//    @PostMapping("/postdata")
//    public @ResponseBody ResponseEntity<?> addData(@RequestBody HashMap<String,Sensor> hp){
//
//        ArrayList<Sensor> s = new ArrayList<Sensor>();
//        hp.forEach((x,y)->{
//            Sensor data=new Sensor(hp.get(x).getName(),hp.get(x).getLocation(),hp.get(x).getLevel(),hp.get(x).getFlowRate());
//            Date d=new Date();
//            data.setTimeOfReading(d);
//            sensorRepository.save(data);
//            s.add(data);
//        });
//
//
//        return ResponseEntity.ok((s) );
//    }



}
