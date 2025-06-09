package com.example.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.ProdottoDTO;
import com.example.demo.models.Prodotto;
import com.example.demo.services.ProdottoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/prodotti")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ProdottoController {

    private final ProdottoService prodottoService;

    @GetMapping
    public List<ProdottoDTO> getAll() {
        List<Prodotto> prodotto = prodottoService.getAllProdotti();
        return prodotto.stream().map(ProdottoDTO::new).toList();
    }

    @GetMapping("/{id}")
    public Prodotto getById(@PathVariable Long id) {
        return prodottoService.getProdottoById(id);
    }
}
