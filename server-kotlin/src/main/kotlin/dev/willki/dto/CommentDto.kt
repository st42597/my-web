package dev.willki.dto

import java.time.LocalDateTime

data class CommentResponse(
    val id: Long,
    val name: String,
    val comment: String,
    val createdAt: LocalDateTime
)

data class CommentPageResponse(
    val totalPages: Int,
    val currentItems: List<CommentResponse>
)

data class CreateCommentRequest(
    val name: String,
    val password: String,
    val comment: String
)

data class DeleteCommentRequest(
    val password: String
)
