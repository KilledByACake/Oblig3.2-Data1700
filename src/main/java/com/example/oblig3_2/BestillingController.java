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

    // Kobler kontrolleren opp mot rep som igjen kobles mot db
    @Autowired
    private BestillingRepository bestillingRep;

    // Lagrer billettene i databasen.
    @PostMapping("/lagreBilletter")
    public String lagreBilletter(Bestilling innBestilling) {
        bestillingRep.save(innBestilling);
        return "Adding a ticket was a success!";
    }

    // Finner billettene som er lagret i db slik at de kan printes ut.
    @GetMapping("/henteBilletter")
    public String henteBilletter(){
        bestillingRep.findAll();
        return "Finding all the tickets was a success!";
    }



    // Sorterer billettene etter etternavn.
    @GetMapping("/sortedByEtternavn")
    public List<Bestilling> sortedByEtternavn(){
        List<Bestilling> bestillinger = bestillingRep.findAll();
        sorterBilletter(bestillinger);
        return bestillinger;
    }

    public void sorterBilletter(List<Bestilling> innBestilling) {
        Collections.sort(innBestilling, new Comparator<Bestilling>() {
            @Override
            public int compare(Bestilling o1, Bestilling o2) {
                return o1.getEtternavn().compareTo(o2.getEtternavn());
            }
        });
    }

    // Sletter ALLE billettene i db.
    @DeleteMapping("/slettBilletter")
    public String slettBilletter(){
        bestillingRep.deleteAll();
        return "Deleting all the tickets was a success!";
    }
}