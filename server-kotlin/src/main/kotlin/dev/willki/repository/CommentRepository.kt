package dev.willki.repository

import dev.willki.entity.Comment
import org.springframework.data.jpa.repository.JpaRepository

interface CommentRepository : JpaRepository<Comment, Long> {
    fun findAllByOrderByIdDesc(): List<Comment>
}
