package com.doantotnghiep.server.feature.wordBook.wordFolder.Response;

import com.doantotnghiep.server.repository.tbl_word_folder.WordFolder;
import lombok.Builder;

import java.util.List;

@Builder
public class AllWordByFolder {
    public Integer total;
    public String folder;
    public Integer totalPage;
    public List<WordFolder> words;
}
