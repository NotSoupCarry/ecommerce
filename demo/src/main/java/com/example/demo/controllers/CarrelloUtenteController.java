package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.CarrelloUtenteDTO;
import com.example.demo.models.CarrelloUtente;
import com.example.demo.services.CarrelloUtenteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/carrello")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class CarrelloUtenteController {

    private final CarrelloUtenteService carrelloUtenteService;

    @PostMapping("/aggiungi")
    public ResponseEntity<?> aggiungiAlCarrello(@RequestParam Long utenteId, @RequestParam Long prodottoId, @RequestParam int quantita) {
        CarrelloUtente carrello = carrelloUtenteService.aggiungiAlCarrello(utenteId, prodottoId, quantita);
        return ResponseEntity.ok(carrello);
    }

    @GetMapping("/utente/{utenteId}")
    public ResponseEntity<List<CarrelloUtenteDTO>> visualizzaCarrello(@PathVariable Long utenteId) {
        List<CarrelloUtenteDTO> carrelloDTO = carrelloUtenteService.getCarrelloByUtenteId(utenteId).stream()
                .map(CarrelloUtenteDTO::new)
                .toList();
        return ResponseEntity.ok(carrelloDTO);
    }

}
