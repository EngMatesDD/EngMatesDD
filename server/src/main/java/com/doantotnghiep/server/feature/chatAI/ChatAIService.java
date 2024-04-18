package com.doantotnghiep.server.feature.chatAI;

import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.feature.chatAI.response.ChatAIResponse;
import com.doantotnghiep.server.repository.tbl_chatAI.ChatAI;
import com.doantotnghiep.server.repository.tbl_chatAI.ChatAIRepository;
import com.doantotnghiep.server.repository.tbl_chatAI.ChatHistory;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class ChatAIService {
    @Value("${open_ai_api_key}")
    private String OPENAI_API_KEY;
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    private final ChatAIRepository chatAIRepository;

    public String getOpenAIResponse(String userId, String chatId, String userInput) throws ResponseException {
        try {
            RestTemplate restTemplate = new RestTemplate();

            List<ChatHistory> chatHistories = new ArrayList<>();
            ChatAI.builder().build();
            ChatAI chatAI = ChatAI.builder()
                    .histories(new ArrayList<>())
                    .userId(userId)
                    .build();
            if (!chatId.isEmpty()) {
                chatAI = chatAIRepository.findChatAIByUserIdAndId(userId, chatId);
                if (chatAI != null) {
                    chatHistories = chatAI.getHistories();
                } else {
                    chatAI = ChatAI.builder()
                            .histories(new ArrayList<>())
                            .userId(userId)
                            .build();
                }
            }
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + OPENAI_API_KEY);

            // Set request body
            Map<String, Object> requestBody = new HashMap<>();
            List<Map<String, String>> messages = new ArrayList<>();

            if (!chatHistories.isEmpty()) {
                for (ChatHistory chatHistory : chatHistories) {
                    messages.add(Map.of("role", chatHistory.getRole(), "content", chatHistory.getMessage()));
                    messages.add(Map.of("role", chatHistory.getRole(), "content", chatHistory.getMessage()));
                }
            } else {
                messages.add(Map.of("role", "system", "content", "You are a helpful assistant."));
                chatAI.getHistories().add(ChatHistory.builder().role("system").message("You are a helpful assistant.").build());
            }

            messages.add(Map.of("role", "user", "content", userInput));
            chatAI.getHistories().add(ChatHistory.builder().role("user").message(userInput).build());
            requestBody.put("model", "gpt-3.5-turbo");
            requestBody.put("messages", messages);

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> responseEntity = restTemplate.exchange(OPENAI_API_URL, HttpMethod.POST, requestEntity, String.class);

            Object response = responseEntity.getBody();

            Gson gson = new Gson();
            ChatAIResponse chatAIResponse = gson.fromJson((String) response, ChatAIResponse.class);

            String contentResposne = chatAIResponse.getChoices().get(0).getMessage().getContent();
            chatAI.getHistories().add(ChatHistory.builder().role("system").message(contentResposne).build());
            chatAIRepository.save(chatAI);

            return responseEntity.getBody();
        } catch (Exception e) {
            throw new ResponseException(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
        }
    }

    public List<ChatAI> getAllChatAI(String userId) {
        return chatAIRepository.findAllByUserId(userId);
    }
}