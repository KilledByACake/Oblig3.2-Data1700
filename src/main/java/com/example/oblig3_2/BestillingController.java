package com.example.oblig3_2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class BestillingController {
    @Autowired
    private BestillingRepository rep;

    // Endring fra "/saveInfo" til "/lagreBestillinger"
    @PostMapping("/lagreBestillinger")
    public void lagreBestilling(@RequestBody Bestilling bestilling) {
        rep.lagreBestilling(bestilling);
    }

    // Endring fra "/getInfo" til "/henteBestillinger", tilpasset returnere en struktur for frontend
    @GetMapping("/henteBestillinger")
    public List<Bestilling> henteBestillinger() {
        return rep.alleBestillinger();
    }

    // Endring fra "/deleteInfo" til "/slettBestillinger", slette alle bestillinger
    @DeleteMapping("/slettBestillinger")
    public void slettBestillinger() {
        rep.slettBestillinger();
    }
}
