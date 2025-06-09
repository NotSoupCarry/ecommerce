package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.CarrelloUtente;

public interface CarrelloUtenteRepository extends JpaRepository<CarrelloUtente, Long> {

    List<CarrelloUtente> findByUtenteId(Long utenteId);

    Optional<CarrelloUtente> findByUtenteIdAndProdottoId(Long utenteId, Long prodottoId);

    void deleteByUtenteIdAndProdottoId(Long utenteId, Long prodottoId);
}
