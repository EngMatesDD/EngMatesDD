package com.doantotnghiep.server.feature.video.Response;

import com.doantotnghiep.server.repository.tbl_video.Video;
import lombok.Builder;

import java.util.List;

@Builder
public class AllVideoResponse {
    public Integer total;
    public Integer totalPage;
    public List<Video> videos;
}
