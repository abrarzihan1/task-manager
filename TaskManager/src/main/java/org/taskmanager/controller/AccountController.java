package org.taskmanager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taskmanager.model.Account;
import org.taskmanager.service.AccountService;

import java.util.Optional;

@RequiredArgsConstructor
@RequestMapping("/api/private/account")
@RestController
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/{username}")
    public Optional<Account> getAccount(@PathVariable String username) {
        return accountService.findByUsername(username);
    }

//    @PostMapping
//    public ResponseEntity<?> createAccount(@RequestBody Account account) {
//        String result = accountService.create(account);
//        if ("Success".equals(result)) {
//            return ResponseEntity.ok().body("Account created successfully");
//        } else {
//            return ResponseEntity.badRequest().body(result);
//        }
//    }
}
