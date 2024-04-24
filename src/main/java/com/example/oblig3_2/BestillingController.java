package com.example.oblig3_2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bestillinger") // Base URL for alle handlinger i denne kontrolleren
public class BestillingController {
    @Autowired
    private JdbcTemplate db;

    //Lagre bestilling
    @PostMapping("/lagre")
    public void lagreBestilling(@RequestBody Bestilling bestilling) {
        String sql = "INSERT INTO Bestilling (film, antall, fornavn, etternavn, adresse, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.update(sql, bestilling.getFilm(), bestilling.getAntall(), bestilling.getFornavn(), bestilling.getEtternavn(), bestilling.getAdresse(), bestilling.getTelefonnr(), bestilling.getEpost());
    }

    //Hente bestilling
    @GetMapping("/hente")
    public List<Bestilling> hentAlleBestillinger() {
        String sql = "SELECT * FROM Bestilling";
        return db.query(sql, new BeanPropertyRowMapper<>(Bestilling.class));
    }

    //Slette bestilling
    @DeleteMapping("/slette")
    public void slettAlleBestillinger() {
        String sql = "DELETE FROM Bestilling";
        db.update(sql);
    }
}
