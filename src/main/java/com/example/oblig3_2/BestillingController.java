package com.example.oblig3_2;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bestillinger")
public class BestillingController {
    private final List<Bestilling> alleBestillinger = new ArrayList<>();

    // Lagre bestilling
    @PostMapping("/lagreBestilling")
    public void lagreBestilling(@RequestBody Bestilling bestilling) {
        alleBestillinger.add(bestilling);
    }

    // Hente alle bestillinger
    @GetMapping("/henteBestilling")
    public List<Bestilling> hentAlleBestillinger() {
        return alleBestillinger;
    }

    // Slette alle bestillinger
    @DeleteMapping("/sletteBestilling")
    public void slettAlleBestillinger() {
        alleBestillinger.clear();
    }
}
