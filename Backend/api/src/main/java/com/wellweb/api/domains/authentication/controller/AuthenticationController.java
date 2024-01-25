package com.wellweb.api.domains.authentication.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/authentication")
public class AuthenticationController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        // TODO: Implement login logic here
        return "Login successful";
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest registerRequest) {
        // TODO: Implement registration logic here

        System.out.println("Attempting to register user with username: " + registerRequest.username);

        return "Registration successful";
    }

    // Other authentication-related endpoints can be added here

    // Inner classes for request payloads
    private static class LoginRequest {
        private String username;
        private String password;

        // Getters and setters
    }

    private static class RegisterRequest {
        private String displayName;
        private String username;
        private String dateOfBirth;
        private String password;
        private String confirmPassword;
        // Getters and setters
    }
    

}
