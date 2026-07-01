package in.hirueats_online_food_delivery_system.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private String paymentMethod;

    private double subtotal;

    private double deliveryFee;

    private double total;

    private String status;

    @Column(length = 500)
    private String deliveryAddress;

    private String deliveryCity;

    private String deliveryPhoneNumber;

    @Column(length = 1000)
    private String deliveryNote;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItemEntity> orderItems;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
