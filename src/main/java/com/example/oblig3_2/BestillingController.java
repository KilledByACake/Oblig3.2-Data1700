package com.example.oblig3_2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
@RestController
public class BestillingController {
    @Autowired
    private BestillingRepository rep;

    // Lagre bestillinger
    @PostMapping("/lagreBestillinger")
    public String lagreBestillinger(Bestilling bestilling) {
        try {
            rep.save(bestilling);
            return "Bestillingen ble sendt!";
        } catch (Exception e) {
            return "Bestillingen ble ikke sendt!" + e.getMessage();
        }
    }

    // Hente bestillinger
    @GetMapping("/henteBestillinger")
    public void henteBestillinger() {
        rep.findAll();
    }

    // Slette betillinger
    @DeleteMapping("/slettBestillinger")
    public void slettBestillinger() {
        rep.deleteAll();
    }
}