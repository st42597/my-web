package dev.willki.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(
    name = "post_views",
    uniqueConstraints = [UniqueConstraint(columnNames = ["slug", "ip_address"])]
)
class PostView(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, length = 255)
    val slug: String,

    @Column(name = "ip_address", nullable = false, length = 45)
    val ipAddress: String,

    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now()
)
