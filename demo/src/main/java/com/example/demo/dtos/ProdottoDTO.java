package com.example.demo.dtos;

import com.example.demo.models.Prodotto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdottoDTO {

    private Long id;
    private String nome;
    private String descrizione;
    private double prezzo;

     public ProdottoDTO(Prodotto prodotto) {
        this.id = prodotto.getId();
        this.nome = prodotto.getNome();
        this.descrizione = prodotto.getDescrizione();
        this.prezzo = prodotto.getPrezzo();
    }
}
