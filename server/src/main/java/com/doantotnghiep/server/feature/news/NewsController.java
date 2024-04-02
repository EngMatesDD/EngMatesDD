package com.doantotnghiep.server.feature.news;

import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.feature.news.response.AllNewsResponse;
import com.doantotnghiep.server.feature.news.system.dto.CreateNewsRequest;
import com.doantotnghiep.server.feature.news.system.dto.UpdateNewsRequest;
import com.doantotnghiep.server.repository.tbl_news.News;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private final NewsService newsService;
    private final ValidateExceptionHandle validateExceptionHandle;

    @GetMapping("/all")
    public ResponseEntity<AllNewsResponse> getAllNews(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam(value = "size", defaultValue = "10") Integer size) throws Exception {
        try {
            return newsService.getAllNews(page, size);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<News> getNewsById(@RequestParam("id") String id) throws ResponseException {
        try {
            return newsService.getNewsById(id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

}
