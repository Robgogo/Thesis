package com.robgogo.ThesisProject;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@CrossOrigin(origins="http://localhost:3001")
@RestController
@RequestMapping(path = "/api")
public class MainController {
    @Autowired
    private SensorRepository sensorRepo;
    @Autowired
    private DataRepository dataRepo;

    @GetMapping(path = "/data")
    public @ResponseBody Iterable<Data> getAllSensor(){
        ArrayList lst=new ArrayList();

        dataRepo.findAll().forEach((x)->{
            JSONObject jo=new JSONObject();
            Sensor s=sensorRepo.findById(x.getSensor().getId()).get();
            jo.put("id",x.getId());
            jo.put("name",s.getName());
            jo.put("latitude",s.getLatitude());
            jo.put("longitude",s.getLongitude());
            JSONObject data=new JSONObject();
            data.put("flowRate",x.getFlowRate());
            data.put("level",x.getLevel());
            data.put("timeOfReading",x.getTimeOfReading());
            jo.put("data",data);
            lst.add(jo.toString());
        });
        //return dataRepo.findAll();
        return lst;
    }

    @PostMapping("/postdata")
    public @ResponseBody ResponseEntity<?> addData(@RequestBody HashMap<String,Data> hp){

        ArrayList<Data> s = new ArrayList<Data>();

            hp.forEach((x,y)->{
                Sensor sensor=sensorRepo.findByName(x);
                Data data=new Data(hp.get(x).getLevel(),hp.get(x).getFlowRate(),hp.get(x).getTimeOfReading());
//                Date d=new Date();
//                data.setTimeOfReading(d);
                data.setSensor(sensor);
                dataRepo.save(data);
                s.add(data);
            });


        return ResponseEntity.ok(s);
    }

    @GetMapping(path = "/sensor")
    public Iterable<Sensor> getSensor(){
        return sensorRepo.findAll();
    }

    @PostMapping("/postsensor")
    public @ResponseBody ResponseEntity<Sensor> postSensor(@RequestBody Sensor sensor){
        Sensor s=new Sensor(sensor.getName(),sensor.getLatitude(),sensor.getLongitude());
        sensorRepo.save(s);
        return ResponseEntity.ok(s);
    }

}
