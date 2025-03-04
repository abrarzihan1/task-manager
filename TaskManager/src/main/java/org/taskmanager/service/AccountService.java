package org.taskmanager.service;

import org.taskmanager.model.Account;

import java.util.Optional;

public interface AccountService {
    public String create(Account account);
    Optional<Account> findByUsername(String username);
    boolean existsByUsername(String username);
}
