package com.net.fisher.post.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity(name = "preferences")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@ToString
public class Preference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preference_id")
    private long preferenceId;

    @Column(name = "member_id")
    private long memberId;

    @Column(name ="tag_id")
    private long tagId;

    @Column(name = "rating")
    private double rating;
}
