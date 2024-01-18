package com.wellweb.api.domains.diaries.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DiariesController {

    @GetMapping("/diaries")
    public String getAllDiaries() {
        // Logic to retrieve all diaries from the database
        return "List of all diaries";
    }

    @PostMapping("/diaries")
    public String createDiary(@RequestBody String diary) {
        // Logic to create a new diary in the database
        return "Diary created successfully";
    }
}
