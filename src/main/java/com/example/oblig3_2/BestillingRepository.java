package com.example.oblig3_2;

import com.example.oblig3_2.Bestilling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class BestillingRepository {
    @Autowired
    private JdbcTemplate db;

    // Lagrer en bestilling i databasen
    public void lagreBestillinger(Bestilling bestilling) {
        String sql = "INSERT INTO Bestilling (film, antall, fornavn, etternavn, adresse, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.update(sql, bestilling.getFilm(), bestilling.getAntall(), bestilling.getFornavn(), bestilling.getEtternavn(), bestilling.getAdresse(), bestilling.getTelefonnr(), bestilling.getEpost());
    }

    //Henter liste med alle bestillinger
    public List<Bestilling> alleBestillinger() {
        String sql = "SELECT * FROM Bestilling ORDER BY etternavn";
        List<Bestilling> alleBestillinger = db.query(sql, new BeanPropertyRowMapper<>(Bestilling.class));
        return alleBestillinger;
    }

    //Sletter alle bestillinger
    public void slettBestillinger() {
        String sql = "DELETE FROM Bestilling";
        db.update(sql);
    }
}