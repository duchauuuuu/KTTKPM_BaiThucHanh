// STATE PATTERN - Quản lý trạng thái đơn hàng

class OrderState {
    constructor(name) {
        this.name = name;
    }

    process(order) {
        throw new Error('Phương thức process() phải được implement');
    }

    cancel(order) {
        throw new Error('Phương thức cancel() phải được implement');
    }

    deliver(order) {
        throw new Error('Phương thức deliver() phải được implement');
    }

    getStatus() {
        return this.name;
    }
}

// Trạng thái: Mới tạo
class NewOrderState extends OrderState {
    constructor() {
        super('Mới tạo');
    }

    process(order) {
        console.log(`\n📋 [${this.name}] Kiểm tra thông tin đơn hàng #${order.id}...`);
        console.log(`   ✓ Khách hàng: ${order.customerName}`);
        console.log(`   ✓ Sản phẩm: ${order.items.map(i => i.name).join(', ')}`);
        console.log(`   ✓ Địa chỉ: ${order.address}`);
        console.log(`   ✓ Tổng tiền sản phẩm: ${order.subtotal.toLocaleString('vi-VN')}đ`);
        console.log(`   ✓ Thông tin hợp lệ!`);
        
        order.setState(new ProcessingOrderState());
        console.log(`   → Chuyển sang trạng thái: ${order.state.name}`);
    }

    cancel(order) {
        console.log(`\n❌ [${this.name}] Hủy đơn hàng #${order.id}...`);
        order.setState(new CancelledOrderState());
        console.log(`   → Đã chuyển sang trạng thái: ${order.state.name}`);
    }

    deliver(order) {
        console.log(`\n⚠️  [${this.name}] Không thể giao hàng! Đơn hàng chưa được xử lý.`);
    }
}

// Trạng thái: Đang xử lý
class ProcessingOrderState extends OrderState {
    constructor() {
        super('Đang xử lý');
    }

    process(order) {
        console.log(`\n📦 [${this.name}] Đóng gói và vận chuyển đơn hàng #${order.id}...`);
        console.log(`   ✓ Đóng gói sản phẩm...`);
        console.log(`   ✓ Gắn nhãn vận chuyển...`);
        console.log(`   ✓ Bàn giao cho đơn vị vận chuyển...`);
        console.log(`   ✓ Đơn hàng đang trên đường giao!`);
    }

    cancel(order) {
        console.log(`\n❌ [${this.name}] Hủy đơn hàng #${order.id}...`);
        console.log(`   ⚠️  Đơn hàng đang được xử lý, cần liên hệ bộ phận vận chuyển`);
        order.setState(new CancelledOrderState());
        console.log(`   → Đã chuyển sang trạng thái: ${order.state.name}`);
    }

    deliver(order) {
        console.log(`\n🚚 [${this.name}] Giao hàng thành công đơn hàng #${order.id}!`);
        order.setState(new DeliveredOrderState());
        console.log(`   → Đã chuyển sang trạng thái: ${order.state.name}`);
    }
}

// Trạng thái: Đã giao
class DeliveredOrderState extends OrderState {
    constructor() {
        super('Đã giao');
    }

    process(order) {
        console.log(`\n✅ [${this.name}] Đơn hàng #${order.id} đã được giao thành công!`);
        console.log(`   ✓ Cập nhật trạng thái hoàn tất trong hệ thống`);
        console.log(`   ✓ Gửi email xác nhận đến khách hàng`);
        console.log(`   ✓ Yêu cầu đánh giá sản phẩm`);
    }

    cancel(order) {
        console.log(`\n⚠️  [${this.name}] Không thể hủy! Đơn hàng #${order.id} đã được giao.`);
        console.log(`   ℹ️  Vui lòng yêu cầu trả hàng/hoàn tiền nếu cần.`);
    }

    deliver(order) {
        console.log(`\n✅ [${this.name}] Đơn hàng #${order.id} đã được giao rồi!`);
    }
}

// Trạng thái: Hủy
class CancelledOrderState extends OrderState {
    constructor() {
        super('Đã hủy');
    }

    process(order) {
        console.log(`\n🚫 [${this.name}] Đơn hàng #${order.id} đã bị hủy!`);
        console.log(`   ✓ Hoàn tiền: ${order.finalTotal.toLocaleString('vi-VN')}đ`);
        console.log(`   ✓ Gửi thông báo hủy đơn đến khách hàng`);
        console.log(`   ✓ Cập nhật kho hàng`);
    }

    cancel(order) {
        console.log(`\n⚠️  [${this.name}] Đơn hàng #${order.id} đã bị hủy rồi!`);
    }

    deliver(order) {
        console.log(`\n⚠️  [${this.name}] Không thể giao hàng! Đơn hàng #${order.id} đã bị hủy.`);
    }
}

module.exports = {
    OrderState,
    NewOrderState,
    ProcessingOrderState,
    DeliveredOrderState,
    CancelledOrderState
};
