package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Utente;

public interface UtenteRepository extends JpaRepository<Utente, Long> {

    Utente findByUsername(String username);
}
