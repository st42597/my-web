package dev.willki.controller

import dev.willki.facade.DatabaseInitFacade
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/initDB")
class DatabaseInitController(
    private val databaseInitFacade: DatabaseInitFacade
) {
    @GetMapping
    fun initializeDatabase(): ResponseEntity<String> {
        databaseInitFacade.initializeDatabase()
        return ResponseEntity.ok("Database initialized successfully.")
    }
}
