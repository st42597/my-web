package dev.willki.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "comments")
class Comment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, length = 50)
    val name: String,

    @Column(nullable = false, length = 100)
    var password: String,

    @Column(nullable = false, columnDefinition = "TEXT")
    val comment: String,

    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now()
)
