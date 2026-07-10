package sn.edu.backend.controller;

import sn.edu.backend.dto.ArticleRequestDTO;
import sn.edu.backend.dto.ArticleResponseDTO;
import sn.edu.backend.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<ArticleResponseDTO>> getAll() {
        return ResponseEntity.ok(articleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ArticleResponseDTO> create(@Valid @RequestBody ArticleRequestDTO requestDTO) {
        ArticleResponseDTO created = articleService.create(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponseDTO> update(@PathVariable Long id, @Valid @RequestBody ArticleRequestDTO requestDTO) {
        return ResponseEntity.ok(articleService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        articleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
