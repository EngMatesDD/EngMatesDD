package com.doantotnghiep.server.feature.wordBook.system.wordCategory.response;

import com.doantotnghiep.server.repository.tbl_word.Word;
import lombok.Builder;

import java.util.List;
@Builder
public class AllWordInCategory {
    public String category;
    public Integer total;
    public Integer totalPage;
    public List<Word> words;
}
