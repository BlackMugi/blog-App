package sn.edu.backend.service;

import sn.edu.backend.dto.ArticleRequestDTO;
import sn.edu.backend.dto.ArticleResponseDTO;
import sn.edu.backend.entity.Article;
import sn.edu.backend.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<ArticleResponseDTO> findAll() {
        return articleRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public ArticleResponseDTO findById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article non trouvé avec l'id : " + id));
        return toResponseDTO(article);
    }

    public ArticleResponseDTO create(ArticleRequestDTO requestDTO) {
        Article article = toEntity(requestDTO);
        Article saved = articleRepository.save(article);
        return toResponseDTO(saved);
    }

    public ArticleResponseDTO update(Long id, ArticleRequestDTO requestDTO) {
        Article existing = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article non trouvé avec l'id : " + id));

        existing.setTitre(requestDTO.getTitre());
        existing.setDescription(requestDTO.getDescription());
        existing.setImageUrl(requestDTO.getImageUrl());
        existing.setDatePublication(requestDTO.getDatePublication());

        Article updated = articleRepository.save(existing);
        return toResponseDTO(updated);
    }

    public void delete(Long id) {
        if (!articleRepository.existsById(id)) {
            throw new RuntimeException("Article non trouvé avec l'id : " + id);
        }
        articleRepository.deleteById(id);
    }

    private ArticleResponseDTO toResponseDTO(Article article) {
        return new ArticleResponseDTO(
                article.getId(),
                article.getTitre(),
                article.getDescription(),
                article.getImageUrl(),
                article.getDatePublication()
        );
    }

    private Article toEntity(ArticleRequestDTO dto) {
        Article article = new Article();
        article.setTitre(dto.getTitre());
        article.setDescription(dto.getDescription());
        article.setImageUrl(dto.getImageUrl());
        article.setDatePublication(dto.getDatePublication());
        return article;
    }
}