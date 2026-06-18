package dev.willki.service

import dev.willki.dto.CommentPageResponse
import dev.willki.dto.CommentResponse
import dev.willki.dto.CreateCommentRequest
import dev.willki.entity.Comment
import dev.willki.repository.CommentRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CommentService(
    private val commentRepository: CommentRepository,
    private val passwordEncoder: PasswordEncoder
) {
    @Transactional(readOnly = true)
    fun getComments(currentPage: Int, itemsPerPage: Int): CommentPageResponse {
        val pageable = PageRequest.of(currentPage, itemsPerPage, Sort.by("id").descending())
        val page = commentRepository.findAllByOrderByIdDesc(pageable)
        return CommentPageResponse(
            totalPages = page.totalPages,
            currentItems = page.content.map { it.toResponse() }
        )
    }

    @Transactional
    fun createComment(request: CreateCommentRequest): CommentResponse {
        val hashedPassword = passwordEncoder.encode(request.password)
        val comment = Comment(
            name = request.name,
            password = hashedPassword,
            comment = request.comment
        )
        return commentRepository.save(comment).toResponse()
    }

    @Transactional
    fun deleteComment(id: Long, password: String, adminPassword: String) {
        val comment = commentRepository.findById(id)
            .orElseThrow { NoSuchElementException("Comment not found") }

        val isPasswordMatch = passwordEncoder.matches(password, comment.password)
        val isAdmin = adminPassword.isNotBlank() && password == adminPassword

        if (!isPasswordMatch && !isAdmin) {
            throw IllegalArgumentException("Password incorrect")
        }

        commentRepository.deleteById(id)
    }

    private fun Comment.toResponse() = CommentResponse(
        id = id,
        name = name,
        comment = comment,
        createdAt = createdAt
    )
}
