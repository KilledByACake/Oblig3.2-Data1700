package com.example.oblig3_2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bestillinger")
public class BestillingController {
    @Autowired
    private JdbcTemplate db;

    // Lagre bestilling
    @PostMapping("/lagre")
    public ResponseEntity<String> lagreBestilling(@RequestBody Bestilling bestilling) {
        String sql = "INSERT INTO Bestilling (film, antall, fornavn, etternavn, adresse, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?, ?)";
        int result = db.update(sql, bestilling.getFilm(), bestilling.getAntall(), bestilling.getFornavn(), bestilling.getEtternavn(), bestilling.getAdresse(), bestilling.getTelefonnr(), bestilling.getEpost());
        if (result == 1) {
            return ResponseEntity.ok("Bestilling lagret");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Feil ved lagring av bestilling");
        }
    }

    // Hente bestillinger
    @GetMapping("/hente")
    public ResponseEntity<List<Bestilling>> hentAlleBestillinger() {
        String sql = "SELECT * FROM Bestilling";
        List<Bestilling> bestillinger = db.query(sql, new BeanPropertyRowMapper<>(Bestilling.class));
        return ResponseEntity.ok(bestillinger);
    }

    // Slette bestillinger
    @DeleteMapping("/slette")
    public ResponseEntity<String> slettAlleBestillinger() {
        String sql = "DELETE FROM Bestilling";
        int result = db.update(sql);
        if (result > 0) {
            return ResponseEntity.ok("Alle bestillinger slettet");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Feil ved sletting av bestillinger");
        }
    }
}
