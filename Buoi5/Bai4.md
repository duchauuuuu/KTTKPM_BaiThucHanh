# Bài 4: Event Choreography vs Event Orchestration

---

## Giới thiệu

Trong kiến trúc Microservices, khi một quy trình nghiệp vụ (workflow) liên quan đến nhiều service, có hai mô hình phối hợp sự kiện phổ biến:

| Mô hình | Mô tả ngắn |
|---|---|
| **Event Choreography** | Các service tự lắng nghe và phản ứng với sự kiện, không có trung tâm điều phối |
| **Event Orchestration** | Một Orchestrator trung tâm ra lệnh cho từng service theo thứ tự |

---

## Bài toán: Workflow Đặt Đơn Thực Phẩm

Một đơn đặt thực phẩm trải qua các bước sau:

```
[Khách hàng đặt đơn]
        ↓
[Xác nhận đơn hàng] → [Kiểm tra kho] → [Thanh toán] → [Chuẩn bị món ăn] → [Giao hàng]
```

**Các service tham gia:**
- `OrderService` — Tạo và quản lý đơn hàng
- `InventoryService` — Kiểm tra nguyên liệu/kho
- `PaymentService` — Xử lý thanh toán
- `KitchenService` — Chuẩn bị món ăn
- `DeliveryService` — Giao hàng đến khách

---

## 1. Thiết kế theo Event Choreography

### Khái niệm

Trong Choreography, **không có trung tâm điều phối**. Mỗi service tự lắng nghe các sự kiện (event) từ Message Broker (Kafka, RabbitMQ...) và tự quyết định hành động tiếp theo, sau đó phát ra sự kiện mới.

### Luồng sự kiện

```
OrderService
  → publish: OrderPlacedEvent
      ↓
InventoryService (lắng nghe OrderPlacedEvent)
  → Kiểm tra kho
  → publish: InventoryCheckedEvent (success/failed)
      ↓
PaymentService (lắng nghe InventoryCheckedEvent)
  → Xử lý thanh toán
  → publish: PaymentCompletedEvent (success/failed)
      ↓
KitchenService (lắng nghe PaymentCompletedEvent)
  → Chuẩn bị món ăn
  → publish: FoodReadyEvent
      ↓
DeliveryService (lắng nghe FoodReadyEvent)
  → Giao hàng
  → publish: OrderDeliveredEvent
      ↓
OrderService (lắng nghe OrderDeliveredEvent)
  → Cập nhật trạng thái đơn hàng: COMPLETED
```

### Sơ đồ

```
┌──────────────┐    OrderPlacedEvent     ┌───────────────────┐
│ OrderService │ ──────────────────────► │ InventoryService  │
└──────────────┘                         └─────────┬─────────┘
       ▲                                           │ InventoryCheckedEvent
       │                                           ▼
       │                                 ┌───────────────────┐
       │                                 │  PaymentService   │
       │                                 └─────────┬─────────┘
       │                                           │ PaymentCompletedEvent
       │                                           ▼
       │                                 ┌───────────────────┐
       │                                 │  KitchenService   │
       │                                 └─────────┬─────────┘
       │                                           │ FoodReadyEvent
       │                                           ▼
       │                                 ┌───────────────────┐
       │   OrderDeliveredEvent           │  DeliveryService  │
       └─────────────────────────────────└───────────────────┘
```

### Ví dụ code minh họa (Spring Boot + Kafka)

**OrderService — Phát sự kiện khi tạo đơn:**

```java
@Service
public class OrderService {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    public Order placeOrder(OrderRequest request) {
        Order order = orderRepository.save(new Order(request));
        kafkaTemplate.send("order.placed", new OrderPlacedEvent(order.getId(), order.getItems()));
        return order;
    }
}
```

**InventoryService — Lắng nghe và phản ứng:**

```java
@Service
public class InventoryService {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @KafkaListener(topics = "order.placed")
    public void onOrderPlaced(OrderPlacedEvent event) {
        boolean available = checkStock(event.getItems());
        if (available) {
            kafkaTemplate.send("inventory.checked", new InventoryCheckedEvent(event.getOrderId(), true));
        } else {
            kafkaTemplate.send("inventory.checked", new InventoryCheckedEvent(event.getOrderId(), false));
        }
    }
}
```

**PaymentService — Lắng nghe kết quả kiểm kho:**

```java
@Service
public class PaymentService {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @KafkaListener(topics = "inventory.checked")
    public void onInventoryChecked(InventoryCheckedEvent event) {
        if (!event.isAvailable()) return; // Dừng nếu hết hàng

        boolean paid = processPayment(event.getOrderId());
        kafkaTemplate.send("payment.completed", new PaymentCompletedEvent(event.getOrderId(), paid));
    }
}
```

---

## 2. Thiết kế theo Event Orchestration

### Khái niệm

Trong Orchestration, có **một Orchestrator trung tâm** chịu trách nhiệm điều phối toàn bộ workflow. Orchestrator gọi lần lượt từng service theo thứ tự định sẵn, theo dõi trạng thái và xử lý lỗi.

### Luồng xử lý

```
Client
  → POST /orders
      ↓
[OrderOrchestrator] ← Trung tâm điều phối
  │
  ├─► Bước 1: Gọi InventoryService.checkStock()
  │       ← Nhận kết quả: OK / FAILED
  │
  ├─► Bước 2: Gọi PaymentService.processPayment()
  │       ← Nhận kết quả: OK / FAILED
  │
  ├─► Bước 3: Gọi KitchenService.prepareFood()
  │       ← Nhận kết quả: READY
  │
  ├─► Bước 4: Gọi DeliveryService.deliver()
  │       ← Nhận kết quả: DELIVERED
  │
  └─► Cập nhật trạng thái đơn hàng: COMPLETED
```

### Sơ đồ

```
                    ┌───────────────────────┐
                    │   OrderOrchestrator   │
                    │   (Trung tâm điều phối)│
                    └──────────┬────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ InventoryService │ │  PaymentService  │ │  KitchenService  │
└──────────────────┘ └──────────────────┘ └──────────────────┘
                                                    │
                                                    ▼
                                          ┌──────────────────┐
                                          │ DeliveryService  │
                                          └──────────────────┘
```

### Ví dụ code minh họa (Spring Boot)

**OrderOrchestrator — Điều phối toàn bộ workflow:**

```java
@Service
public class OrderOrchestrator {

    @Autowired private InventoryServiceClient inventoryClient;
    @Autowired private PaymentServiceClient paymentClient;
    @Autowired private KitchenServiceClient kitchenClient;
    @Autowired private DeliveryServiceClient deliveryClient;
    @Autowired private OrderRepository orderRepository;

    @Transactional
    public OrderResult processOrder(OrderRequest request) {
        Order order = orderRepository.save(new Order(request));

        // Bước 1: Kiểm tra kho
        InventoryResponse inventory = inventoryClient.checkStock(order.getItems());
        if (!inventory.isAvailable()) {
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
            return OrderResult.failed("Hết hàng");
        }

        // Bước 2: Thanh toán
        PaymentResponse payment = paymentClient.processPayment(order.getId(), order.getTotalPrice());
        if (!payment.isSuccess()) {
            order.setStatus(OrderStatus.PAYMENT_FAILED);
            orderRepository.save(order);
            return OrderResult.failed("Thanh toán thất bại");
        }

        // Bước 3: Chuẩn bị món ăn
        kitchenClient.prepareFood(order.getId(), order.getItems());

        // Bước 4: Giao hàng
        deliveryClient.deliver(order.getId(), order.getAddress());

        order.setStatus(OrderStatus.COMPLETED);
        orderRepository.save(order);
        return OrderResult.success(order);
    }
}
```

**OrderController — Nhận request từ client:**

```java
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderOrchestrator orchestrator;

    @PostMapping
    public ResponseEntity<OrderResult> placeOrder(@RequestBody OrderRequest request) {
        OrderResult result = orchestrator.processOrder(request);
        return ResponseEntity.ok(result);
    }
}
```

---

## 3. So Sánh Ưu Nhược Điểm

### Event Choreography

| | Chi tiết |
|---|---|
| **Ưu điểm** | ✅ Loose coupling — các service hoàn toàn độc lập với nhau |
| | ✅ Dễ thêm service mới mà không cần sửa service khác |
| | ✅ Khả năng chịu lỗi cao — một service chết không ảnh hưởng toàn bộ flow |
| | ✅ Phù hợp với hệ thống phân tán quy mô lớn |
| **Nhược điểm** | ❌ Khó theo dõi, debug toàn bộ luồng xử lý |
| | ❌ Logic nghiệp vụ bị phân tán khắp nơi, khó hiểu tổng thể |
| | ❌ Khó xử lý rollback (compensation) khi xảy ra lỗi giữa chừng |
| | ❌ Dễ xảy ra event cycle nếu không thiết kế cẩn thận |

### Event Orchestration

| | Chi tiết |
|---|---|
| **Ưu điểm** | ✅ Logic tập trung, dễ đọc, dễ hiểu và theo dõi workflow |
| | ✅ Xử lý lỗi và rollback rõ ràng, tường minh |
| | ✅ Dễ debug và giám sát trạng thái từng bước |
| | ✅ Phù hợp với nghiệp vụ phức tạp, nhiều điều kiện rẽ nhánh |
| **Nhược điểm** | ❌ Orchestrator trở thành điểm tập trung — nếu chết thì cả flow dừng |
| | ❌ Tight coupling — Orchestrator biết và phụ thuộc vào tất cả service |
| | ❌ Khó scale Orchestrator riêng lẻ |
| | ❌ Khi thêm service mới phải sửa Orchestrator |

### Bảng so sánh tổng quan

| Tiêu chí | Choreography | Orchestration |
|---|---|---|
| **Coupling** | Loose (lỏng lẻo) | Tight (chặt chẽ) |
| **Khả năng mở rộng** | Dễ scale từng service | Orchestrator là nút thắt |
| **Theo dõi luồng** | Khó, cần distributed tracing | Dễ, tập trung một nơi |
| **Xử lý lỗi** | Phức tạp (Saga pattern) | Đơn giản, rõ ràng |
| **Rollback** | Khó | Dễ kiểm soát |
| **Điểm lỗi đơn (SPOF)** | Không có | Orchestrator là SPOF |
| **Phù hợp với** | Hệ thống lớn, phân tán | Nghiệp vụ phức tạp, nhiều điều kiện |

---

## 4. Quyết Định Mô Hình Phù Hợp

### Xét theo tiêu chí Scaling

**Choreography phù hợp hơn khi:**
- Hệ thống có lượng đơn hàng lớn, cần scale từng service độc lập.
- `PaymentService` cần scale ×10 nhưng `DeliveryService` chỉ cần scale ×2 → Choreography cho phép làm điều này mà không ảnh hưởng nhau.
- Dùng Kafka với nhiều partition → xử lý song song hiệu quả.

**Orchestration gặp hạn chế khi scale:**
- Orchestrator là nút thắt cổ chai (bottleneck) — phải scale cả Orchestrator khi traffic tăng.
- Nếu Orchestrator không được thiết kế stateless thì rất khó scale ngang.

### Xét theo tiêu chí Resilience (Khả năng chịu lỗi)

**Choreography có resilience tốt hơn:**
- Một service chết (e.g., `KitchenService` down) → event nằm trong queue Kafka → khi service phục hồi sẽ tự xử lý tiếp, **không mất dữ liệu**.
- Không có điểm lỗi đơn (Single Point of Failure).

**Orchestration dễ bị ảnh hưởng:**
- Orchestrator down → toàn bộ workflow bị dừng.
- Cần cơ chế retry, circuit breaker cho Orchestrator.

### Kết luận & Khuyến nghị

> Đối với hệ thống đặt đơn thực phẩm cần **scaling cao** và **resilience tốt**, mô hình **Event Choreography kết hợp Saga Pattern** là lựa chọn phù hợp hơn.

**Lý do:**

1. **Scaling độc lập**: Mỗi service (Payment, Kitchen, Delivery) có thể scale riêng lẻ dựa trên tải thực tế.
2. **Không có SPOF**: Khi một service gặp sự cố, các service khác vẫn hoạt động bình thường.
3. **Fault tolerance với Message Queue**: Kafka/RabbitMQ đảm bảo event không bị mất khi service tạm thời không khả dụng.
4. **Phù hợp Microservices**: Từng service có thể được phát triển, deploy và scale hoàn toàn độc lập.

**Tuy nhiên**, nếu hệ thống ở giai đoạn đầu, team nhỏ, nghiệp vụ chưa phức tạp → **Orchestration** dễ phát triển và bảo trì hơn, có thể chuyển sang Choreography khi hệ thống lớn dần.

```
Giai đoạn MVP / Team nhỏ   →  Sử dụng Orchestration
Giai đoạn Scale / Team lớn →  Chuyển sang Choreography + Saga Pattern
```
