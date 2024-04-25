package com.example.oblig3_2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BestillingController {
    @Autowired
    private JdbcTemplate db;

    //Lagre bestilling
    @PostMapping("/lagreBestillinger")
    public void lagreBestillinger(@RequestBody Bestilling bestilling) {
        String sql = "INSERT INTO Bestilling (film, antall, fornavn, etternavn, adresse, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.update(sql, bestilling.getFilm(), bestilling.getAntall(), bestilling.getFornavn(), bestilling.getEtternavn(), bestilling.getAdresse(), bestilling.getTelefonnr(), bestilling.getEpost());
    }

    //Hente bestilling
    @GetMapping("/hentBestillinger")
    public List<Bestilling> hentBestillinger() {
        String sql = "SELECT * FROM Bestilling ORDER BY etternavn";
        return db.query(sql, new BeanPropertyRowMapper<>(Bestilling.class));
    }

    //Slette bestilling
    @DeleteMapping("/slettBestillinger")
    public void slettBestillinger() {
        String sql = "DELETE FROM Bestilling";
        db.update(sql);
    }
}