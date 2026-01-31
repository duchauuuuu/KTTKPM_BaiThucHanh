// HỆ THỐNG TÍCH HỢP: QUẢN LÝ ĐƠN HÀNG + TÍNH THUẾ + THANH TOÁN
// Áp dụng 3 Design Patterns: State, Strategy, Decorator

const Product = require('./models/Product');
const Order = require('./models/Order');

// State Pattern
const {
    NewOrderState,
    ProcessingOrderState,
    DeliveredOrderState,
    CancelledOrderState
} = require('./state/OrderState');

// Strategy Pattern - Tax
const {
    VATTaxStrategy,
    LuxuryTaxStrategy,
    NoTaxStrategy
} = require('./strategy/TaxStrategy');

// Strategy Pattern - Payment
const {
    CreditCardPaymentStrategy,
    PayPalPaymentStrategy,
    EWalletPaymentStrategy,
    CashPaymentStrategy
} = require('./strategy/PaymentStrategy');

// Decorator Pattern
const {
    BasicPayment,
    ProcessingFeeDecorator,
    DiscountCodeDecorator,
    ShippingFeeDecorator,
    ExpressDeliveryDecorator,
    InsuranceFeeDecorator,
    LoyaltyPointsDecorator
} = require('./decorator/PaymentDecorator');

// Helper function để hiển thị chi tiết thanh toán
function displayPaymentBreakdown(paymentComponent) {
    const breakdown = paymentComponent.getBreakdown();
    const finalAmount = paymentComponent.getAmount();

    console.log(`\nCHI TIẾT THANH TOÁN:`);
    console.log('-----------------------------------------------------------');
    
    breakdown.forEach((item, index) => {
        const amount = item.amount.toLocaleString('vi-VN') + 'đ';
        const sign = item.amount >= 0 ? '+' : '';
        console.log(`${index + 1}. ${item.name}: ${sign}${amount}`);
    });
    
    console.log('-----------------------------------------------------------');
    console.log(`TỔNG THANH TOÁN: ${finalAmount.toLocaleString('vi-VN')}đ`);
    console.log('');
}

console.log('\n=== HỆ THỐNG TÍCH HỢP: ĐƠN HÀNG + THUẾ + THANH TOÁN ===');
console.log('State | Strategy | Decorator\n');

console.log('\n\n===== KỊCH BẢN 1: ĐƠN HÀNG THÀNH CÔNG (FULL QUY TRÌNH) =====\n');

console.log('BƯỚC 1: TẠO SẢN PHẨM VỚI THUẾ');
console.log('Tạo danh sách sản phẩm với các loại thuế khác nhau:\n');

// Sản phẩm 1: Laptop (VAT 10%)
const laptop = new Product('SP001', 'Laptop Dell XPS 15', 25000000, new VATTaxStrategy(0.1));
laptop.displayInfo();

// Sản phẩm 2: Túi Hermès (Thuế xa xỉ 30%)
const bag = new Product('SP002', 'Túi Hermès Birkin', 80000000, new LuxuryTaxStrategy(0.3));
bag.displayInfo();

// Sản phẩm 3: Sách (Miễn thuế)
const book = new Product('SP003', 'Sách lập trình JavaScript', 250000, new NoTaxStrategy());
book.displayInfo();

console.log('\nBƯỚC 2: TẠO ĐƠN HÀNG (STATE PATTERN)');

const order1 = new Order('DH001', 'Nguyễn Văn A', '123 Nguyễn Huệ, Q.1, TP.HCM');

console.log('\nThêm sản phẩm vào đơn hàng...');
order1.addItem(laptop, 1);
order1.addItem(bag, 1);
order1.addItem(book, 2);

order1.displayInfo();

console.log('\nBƯỚC 3: XỬ LÝ THANH TOÁN (STRATEGY + DECORATOR)');

console.log('\nTính toán tổng tiền thanh toán với các khoản phí...');

// Tạo payment component cơ bản
let payment = new BasicPayment(order1.finalTotal, 'Tổng tiền đơn hàng (bao gồm thuế)');

// Thêm phí vận chuyển
payment = new ShippingFeeDecorator(payment, 30000);

// Thêm phí giao hàng nhanh
payment = new ExpressDeliveryDecorator(payment, 50000);

// Thêm bảo hiểm
payment = new InsuranceFeeDecorator(payment, 0.02);

// Áp dụng mã giảm giá
payment = new DiscountCodeDecorator(payment, 'SAVE20', 0.2);

// Thêm phí xử lý thanh toán
payment = new ProcessingFeeDecorator(payment, 0.03);

// Sử dụng điểm thưởng
payment = new LoyaltyPointsDecorator(payment, 50, 1000);

displayPaymentBreakdown(payment);

console.log('Chọn phương thức thanh toán: Thẻ tín dụng');
const paymentStrategy = new CreditCardPaymentStrategy(
    '4532123456789012',
    'NGUYEN VAN A',
    '123',
    '12/26'
);

const paymentResult = paymentStrategy.pay(payment.getAmount(), { orderId: order1.id });
order1.setPaymentResult(paymentResult);
console.log(`\nThanh toán thành công! Mã giao dịch: ${paymentResult.transactionId}`);

console.log('\nBƯỚC 4: XỬ LÝ TRẠNG THÁI ĐƠN HÀNG (STATE PATTERN)');

console.log('\nXử lý đơn hàng qua các trạng thái:');
order1.process(); // Mới tạo → Đang xử lý

console.log('\nĐóng gói và vận chuyển:');
order1.process(); // Xử lý đóng gói

console.log('\nGiao hàng:');
order1.deliver(); // Đang xử lý → Đã giao

console.log('\nHoàn tất đơn hàng:');
order1.process(); // Xử lý sau khi giao

console.log('\n\n===== KẾT LUẬN =====\n');

console.log('HỆ THỐNG TÍCH HỢP HOÀN CHỈNH\n');

console.log('1. STATE PATTERN - Quản lý trạng thái đơn hàng');
console.log('   - Mới tạo → Đang xử lý → Đã giao');
console.log('   - Xử lý hủy đơn và hoàn tiền');
console.log('   - Mỗi trạng thái có hành vi riêng');
console.log('   - Tránh if-else phức tạp');
console.log('   - Dễ thêm trạng thái mới');
console.log('   - Code rõ ràng, dễ maintain\n');

console.log('2. STRATEGY PATTERN (Kép)');
console.log('   A. Chiến lược tính thuế:');
console.log('      - VAT 10%: Hàng thông thường');
console.log('      - Thuế xa xỉ 30%: Hàng cao cấp');
console.log('      - Miễn thuế: Hàng thiết yếu');
console.log('   B. Chiến lược thanh toán:');
console.log('      - Thẻ tín dụng');
console.log('      - PayPal');
console.log('      - Ví điện tử (MoMo, ZaloPay...)');
console.log('      - Tiền mặt (COD)');
console.log('   - Linh hoạt thay đổi tại runtime');
console.log('   - Dễ thêm phương thức mới');
console.log('   - Tách biệt logic xử lý\n');

console.log('3. DECORATOR PATTERN - Tính năng thanh toán');
console.log('   - Phí vận chuyển');
console.log('   - Phí giao hàng nhanh');
console.log('   - Bảo hiểm đơn hàng');
console.log('   - Mã giảm giá');
console.log('   - Điểm thưởng thành viên');
console.log('   - Phí xử lý thanh toán');
console.log('   - Kết hợp linh hoạt nhiều tính năng');
console.log('   - Không thay đổi code gốc');
console.log('   - Tuân thủ Open/Closed Principle\n');

console.log('KẾT HỢP CẢ 3 PATTERNS:');
console.log('1. Tạo sản phẩm với STRATEGY (Tax)');
console.log('2. Thêm sản phẩm vào đơn hàng');
console.log('3. Tính toán với DECORATOR (Fees & Discounts)');
console.log('4. Thanh toán với STRATEGY (Payment Method)');
console.log('5. Xử lý đơn hàng với STATE (Order Lifecycle)');
console.log('=> Quy trình hoàn chỉnh, linh hoạt và dễ mở rộng\n');

console.log('ƯU ĐIỂM CỦA GIẢI PHÁP:');
console.log('- Tách biệt rõ ràng các concern');
console.log('- Dễ dàng test từng component');
console.log('- Khả năng mở rộng cao');
console.log('- Code sạch, tuân thủ SOLID');
console.log('- Tái sử dụng code tốt');
console.log('- Dễ bảo trì và nâng cấp\n');

console.log('ỨNG DỤNG THỰC TẾ:');
console.log('- E-commerce Platform (Shopee, Lazada, Tiki)');
console.log('- Payment Gateway');
console.log('- Order Management System');
console.log('- POS System');
console.log('- Marketplace Platform\n');

console.log('BÀI HỌC DESIGN PATTERNS:');
console.log('- State: Quản lý vòng đời phức tạp');
console.log('- Strategy: Linh hoạt trong thuật toán');
console.log('- Decorator: Mở rộng không xâm lấn');
console.log('- Kết hợp: Giải quyết vấn đề thực tế\n');

console.log('Demo hoàn tất! Hệ thống tích hợp đầy đủ 3 Design Patterns.\n');
