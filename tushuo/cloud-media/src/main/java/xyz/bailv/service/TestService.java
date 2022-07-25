package xyz.bailv.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

public class TestService {

    @Autowired
    RestTemplate restTemplate;

    public String Test(){
        String url = "http://clouduser/user/"+1;
        return restTemplate.getForObject(url,String.class);
    }
}
