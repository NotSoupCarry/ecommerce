package com.example.demo.controllers;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.ProdottoDTO;
import com.example.demo.models.Prodotto;
import com.example.demo.services.ProdottoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class PublicController {
    
    private final ProdottoService prodottoService;

    @GetMapping("/allProducts")
    public List<ProdottoDTO> getAll() {
        List<Prodotto> prodotto = prodottoService.getAllProdotti();
        return prodotto.stream().map(ProdottoDTO::new).toList();
    }
}
