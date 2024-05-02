package com.doantotnghiep.server.feature.chatAI.response;

import lombok.Data;

@Data
public class Choice {
    private int index;
    private Message message;
    private Object logprobs; // Chú ý: Dữ liệu logprobs có thể là một đối tượng JSON hoặc null
    private String finish_reason;
}
