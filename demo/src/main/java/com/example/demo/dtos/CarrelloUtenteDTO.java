package com.example.demo.dtos;

import com.example.demo.models.CarrelloUtente;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarrelloUtenteDTO {

    private Long prodottoId;
    private String nomeProdotto;
    private double prezzo;
    private int quantita;

    public CarrelloUtenteDTO(CarrelloUtente carrello) {
        this.prodottoId = carrello.getProdotto().getId();
        this.nomeProdotto = carrello.getProdotto().getNome();
        this.prezzo = carrello.getProdotto().getPrezzo();
        this.quantita = carrello.getQuantita();
    }

}
