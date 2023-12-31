package com.net.fisher.kafka.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {
    @Value(value = "${message.topic.name}")
    private String topicName;

    @Value(value = "${message.topic.name2}")
    private String topicName2;

    private final KafkaTemplate<String, Object> kafkaTemplate;


    @Async
    public void sendLogDto(Object message){
        /*try {
            Thread.sleep(5000);*/
        //System.out.println("Produce content : "+message.getContent());
        kafkaTemplate.send(topicName,message);
        /*}catch (InterruptedException e){
            e.printStackTrace();
        }*/
    }

    public void sendLogDto2(Object message){
        //System.out.println("Produce content : "+message.getContent());
        kafkaTemplate.send(topicName2,message);
    }

}
