package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.CarrelloUtente;
import com.example.demo.models.Prodotto;
import com.example.demo.models.Utente;
import com.example.demo.repositories.CarrelloUtenteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarrelloUtenteService {

    private final CarrelloUtenteRepository carrelloUtenteRepository;
    private final UtenteService utenteService;
    private final ProdottoService prodottoService;

    // Aggiungi un prodotto al carrello dell'utente loggato
    @Transactional
    public CarrelloUtente aggiungiAlCarrello(Long utenteId, Long prodottoId, int quantita) {
        String username = utenteService.getUtenteById(utenteId).getUsername();
        Utente utente = utenteService.findByUsername(username);
        Prodotto prodotto = prodottoService.getProdottoById(prodottoId);

        CarrelloUtente carrello = new CarrelloUtente();
        carrello.setUtente(utente);
        carrello.setProdotto(prodotto);
        carrello.setQuantita(quantita);

        return carrelloUtenteRepository.save(carrello);
    }

    //elimina un prodotto dal carello
    @Transactional
    public void eliminaDalCarello(Long utenteId, Long prodottoId) {
        carrelloUtenteRepository.deleteByUtenteIdAndProdottoId(utenteId, prodottoId);
    }

    // Visualizza carrello di un utente specifico
    public List<CarrelloUtente> getCarrelloByUtenteId(Long utenteId) {
        return carrelloUtenteRepository.findByUtenteId(utenteId);
    }

    // Visualizza la quantita del prodotto del carello per prodotto id e utente id
    public int getQuantitaProdottoNelCarrello(Long utenteId, Long prodottoId) {
        return carrelloUtenteRepository
                .findByUtenteIdAndProdottoId(utenteId, prodottoId)
                .map(CarrelloUtente::getQuantita)
                .orElse(0); // se non esiste, restituisce 0
    }

    // visualizza tutti i carrelli (admin)
    public List<CarrelloUtente> getTuttiICarrelli() {
        return carrelloUtenteRepository.findAll();
    }

    @Transactional
    public CarrelloUtente aggiornaQuantitaProdotto(Long utenteId, Long prodottoId, int nuovaQuantita) {
        // Trova l'elemento nel carrello
        CarrelloUtente carrello = carrelloUtenteRepository
                .findByUtenteIdAndProdottoId(utenteId, prodottoId)
                .orElseThrow(() -> new RuntimeException("Prodotto non trovato nel carrello"));

        carrello.setQuantita(nuovaQuantita);

        return carrelloUtenteRepository.save(carrello);
    }

}
