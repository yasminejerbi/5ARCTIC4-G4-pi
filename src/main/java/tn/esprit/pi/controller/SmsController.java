package tn.esprit.pi.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.pi.SmsRequest;
import tn.esprit.pi.services.SmsService;

@RestController
@RequestMapping("api/sms")
public class SmsController {
    private final SmsService service;

    @Autowired
    public SmsController(SmsService service) {
        this.service = service;
    }

    @PostMapping
    public void sendSms(@RequestBody SmsRequest smsRequest) {
        service.sendSms(smsRequest);
    }
}
