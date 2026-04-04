package dev.willki.repository

import dev.willki.entity.Comment
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface CommentRepository : JpaRepository<Comment, Long> {
    fun findAllByOrderByIdDesc(pageable: Pageable): Page<Comment>
}
