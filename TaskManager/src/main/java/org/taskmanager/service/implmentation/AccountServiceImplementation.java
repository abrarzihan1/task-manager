package org.taskmanager.service.implmentation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.taskmanager.model.Account;
import org.taskmanager.repository.AccountRepository;
import org.taskmanager.service.AccountService;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AccountServiceImplementation implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    public String create(Account account) {
        if (accountRepository.existsByUsername(account.getUsername())) {
            return "Account with username " + account.getUsername() + " already exists";
        }
        accountRepository.save(account);
        return "Success";
    }

    @Override
    public Optional<Account> findByUsername(String username) {
        return Optional.ofNullable(accountRepository.findByUsername(username));
    }

    @Override
    public boolean existsByUsername(String username) {
        return accountRepository.existsByUsername(username);
    }


}
