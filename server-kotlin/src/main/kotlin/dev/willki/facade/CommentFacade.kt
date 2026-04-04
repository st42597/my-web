package dev.willki.facade

import dev.willki.dto.CommentPageResponse
import dev.willki.dto.CommentResponse
import dev.willki.dto.CreateCommentRequest
import dev.willki.service.CommentService
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class CommentFacade(
    private val commentService: CommentService,
    @Value("\${app.admin-password:}") private val adminPassword: String
) {
    fun getComments(currentPage: Int, itemsPerPage: Int): CommentPageResponse =
        commentService.getComments(currentPage, itemsPerPage)

    fun createComment(request: CreateCommentRequest): CommentResponse =
        commentService.createComment(request)

    fun deleteComment(id: Long, password: String) =
        commentService.deleteComment(id, password, adminPassword)
}
