package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Prodotto;

public interface ProdottoRespository extends JpaRepository<Prodotto, Long> {
}
