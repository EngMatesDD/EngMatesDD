package com.doantotnghiep.server.repository.tbl_chatAI;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatHistory {
    String role;
    String message;
}
