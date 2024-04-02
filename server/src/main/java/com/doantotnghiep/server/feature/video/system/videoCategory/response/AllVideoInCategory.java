package com.doantotnghiep.server.feature.video.system.videoCategory.response;

import com.doantotnghiep.server.repository.tbl_video.Video;
import lombok.Builder;

import java.util.List;
@Builder
public class AllVideoInCategory {
    public String category;
    public Integer total;
    public Integer totalPage;
    public List<Video> videos;
}
