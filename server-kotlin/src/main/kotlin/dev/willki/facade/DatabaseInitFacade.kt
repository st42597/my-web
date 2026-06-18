package dev.willki.facade

import dev.willki.service.DatabaseInitService
import org.springframework.stereotype.Component

@Component
class DatabaseInitFacade(
    private val databaseInitService: DatabaseInitService
) {
    fun initializeDatabase() = databaseInitService.initializeDatabase()
}
