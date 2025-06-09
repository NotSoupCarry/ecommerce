package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.UtenteDTO;
import com.example.demo.models.CarrelloUtente;
import com.example.demo.models.Prodotto;
import com.example.demo.services.CarrelloUtenteService;
import com.example.demo.services.ProdottoService;
import com.example.demo.services.UtenteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AdminController {

    private final UtenteService utenteService;
    private final ProdottoService prodottoService;
    private final CarrelloUtenteService carrelloUtenteService;

    // Solo admin: visualizza tutti gli utenti
    @GetMapping("/utenti/all")
    public ResponseEntity<List<UtenteDTO>> getAllUtenti() {
        return ResponseEntity.ok(utenteService.getAllUtenti());
    }

    // Solo admin: aggiungi un prodotto
    @PostMapping("/prodotto")
    public Prodotto creaProdotto(@RequestBody Prodotto prodotto) {
        return prodottoService.creaProdotto(prodotto);
    }

    // Solo admin: elimina un prodotto
    @DeleteMapping("/prodotto/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        prodottoService.eliminaProdotto(id);
        return ResponseEntity.ok().body(Map.of("message", "Prodotto eliminato"));
    }

    // Solo admin: visualizza tutti i carrelli
    @GetMapping("/CarrelloUtente")
    public ResponseEntity<List<CarrelloUtente>> visualizzaTuttiICarrelli() {
        return ResponseEntity.ok(carrelloUtenteService.getTuttiICarrelli());
    }
}
