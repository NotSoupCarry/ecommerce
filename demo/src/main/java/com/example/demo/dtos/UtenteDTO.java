package com.example.demo.dtos;

import com.example.demo.enums.Ruoli;
import com.example.demo.models.Utente;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtenteDTO {
    private Long id;
    private String username;
    private Ruoli ruolo;

    
    public UtenteDTO(Utente utente) {
        this.id = utente.getId();
        this.username = utente.getUsername();
        this.ruolo = utente.getRuolo();
    }
}
