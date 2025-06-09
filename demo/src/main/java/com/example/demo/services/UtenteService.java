package com.example.demo.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.UtenteDTO;
import com.example.demo.enums.Ruoli;
import com.example.demo.models.Utente;
import com.example.demo.repositories.UtenteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UtenteService {

    private final UtenteRepository utenteRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UtenteDTO> getAllUtenti() {
        return utenteRepository.findAll()
                .stream()
                .map(UtenteDTO::new)
                .toList();
    }

    public Utente getUtenteById(Long id) {
        return utenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));
    }

    public Utente findByUsername(String username) {
        return utenteRepository.findByUsername(username);
    }

    @Transactional
    public Utente register(Utente utente) {
        if (utente.getRuolo() == null || utente.getRuolo().name() == null) {
            utente.setRuolo(Ruoli.ROLE_USER);
        }
        utente.setPassword(passwordEncoder.encode(utente.getPassword()));
        return utenteRepository.save(utente);
    }

}
