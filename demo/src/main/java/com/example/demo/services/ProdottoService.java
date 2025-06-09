package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Prodotto;
import com.example.demo.repositories.ProdottoRespository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProdottoService {

    private final ProdottoRespository prodottoRespository;

    // lista di tutti i prodotti
    public List<Prodotto> getAllProdotti() {
        return prodottoRespository.findAll();
    }

    // get di un prodotto con id specifico
    public Prodotto getProdottoById(Long id) {
        return prodottoRespository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prodotto non trovato"));
    }

    // aggiugni un prodotto (admin)
    @Transactional
    public Prodotto creaProdotto(Prodotto prodotto) {
        return prodottoRespository.save(prodotto);
    }

    // elimina un prodotto (admin)
    @Transactional
    public void eliminaProdotto(Long id) {
        if (!prodottoRespository.existsById(id)) {
            throw new IllegalArgumentException("Prodotto non trovato con id: " + id);
        }
        prodottoRespository.deleteById(id);
    }
}
