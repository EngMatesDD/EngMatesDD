package com.doantotnghiep.server.feature.wordBook.system.wordCategory.response;

import com.doantotnghiep.server.repository.tbl_word_category.WordCategory;
import lombok.Builder;

import java.util.List;
@Builder
public class AllWordCategory {
    public List<WordCategory> wordCategories;
    public Integer total;
    public Integer totalPage;
}
