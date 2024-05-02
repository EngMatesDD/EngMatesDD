package com.doantotnghiep.server.feature.wordBook.system.wordCategory;

import com.doantotnghiep.server.config.jwt_config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.feature.wordBook.system.wordCategory.dto.CreateWordCategoryRequest;
import com.doantotnghiep.server.feature.wordBook.system.wordCategory.dto.UpdateWordCategoryRequest;
import com.doantotnghiep.server.feature.wordBook.system.wordCategory.response.AllWordCategory;
import com.doantotnghiep.server.feature.wordBook.system.wordCategory.response.AllWordInCategory;
import com.doantotnghiep.server.repository.tbl_word_category.WordCategory;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wordCategory")
@Transactional(rollbackFor = {Exception.class})
public class WordCategoryController {
    private final WordCategoryService wordCategoryService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @GetMapping("/all")
    public AllWordCategory getAllWordCategory(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) {
        return wordCategoryService.getAllWordCategory(page, size);
    }

    @PostMapping("")
    public WordCategory createWordCategory(@Valid @RequestBody CreateWordCategoryRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return wordCategoryService.createWordCategory(request.getName());
    }

    @GetMapping("/{id}")
    public WordCategory getWordCategoryById(@PathVariable String id) throws ResponseException {
        return wordCategoryService.getWordCategoryById(id);
    }

    @GetMapping("/name")
    public WordCategory getWordCategoryByName(@RequestParam String name) throws ResponseException {
        return wordCategoryService.getWordCategoryByName(name);
    }

    @PutMapping("")
    public WordCategory updateWordCategory(@Valid @RequestBody UpdateWordCategoryRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return wordCategoryService.updateWordCategory(request.getId(), request.getName());
    }

    @DeleteMapping("/{id}")
    public WordCategory deleteWordCategory(@PathVariable String id) throws ResponseException {
        return wordCategoryService.deleteWordCategory(id);
    }

    @GetMapping("/{id}/words")
    public AllWordInCategory getAllWordInCategory(@PathVariable String id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        return wordCategoryService.getAllWordInCategory(id, page, size);
    }

}
