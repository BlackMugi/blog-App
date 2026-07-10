package sn.edu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleResponseDTO {

    private Long id;
    private String titre;
    private String description;
    private String imageUrl;
    private LocalDate datePublication;
}