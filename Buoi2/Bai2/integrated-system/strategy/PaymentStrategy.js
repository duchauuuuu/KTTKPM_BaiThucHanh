// STRATEGY PATTERN - Chiến lược thanh toán

class PaymentStrategy {
    pay(amount, orderInfo) {
        throw new Error('Phương thức pay() phải được implement');
    }

    getPaymentMethod() {
        throw new Error('Phương thức getPaymentMethod() phải được implement');
    }
}

// Thanh toán bằng thẻ tín dụng
class CreditCardPaymentStrategy extends PaymentStrategy {
    constructor(cardNumber, cardHolder, cvv, expiry) {
        super();
        this.name = 'Thẻ tín dụng';
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.cvv = cvv;
        this.expiry = expiry;
    }

    pay(amount, orderInfo) {
        console.log(`\n💳 [${this.name}]`);
        console.log(`   ✓ Chủ thẻ: ${this.cardHolder}`);
        console.log(`   ✓ Số thẻ: **** **** **** ${this.cardNumber.slice(-4)}`);
        console.log(`   ✓ Hạn sử dụng: ${this.expiry}`);
        console.log(`   ✓ Đang xác thực thẻ...`);
        console.log(`   ✓ Số tiền thanh toán: ${amount.toLocaleString('vi-VN')}đ`);
        console.log(`   ✓ Thanh toán thành công!`);
        
        return {
            success: true,
            method: this.name,
            amount: amount,
            transactionId: `CC${Date.now()}`,
            cardLast4: this.cardNumber.slice(-4)
        };
    }

    getPaymentMethod() {
        return this.name;
    }
}

// Thanh toán bằng PayPal
class PayPalPaymentStrategy extends PaymentStrategy {
    constructor(email) {
        super();
        this.name = 'PayPal';
        this.email = email;
    }

    pay(amount, orderInfo) {
        console.log(`\n💰 [${this.name}]`);
        console.log(`   ✓ Tài khoản PayPal: ${this.email}`);
        console.log(`   ✓ Đang kết nối với PayPal...`);
        console.log(`   ✓ Xác thực tài khoản...`);
        console.log(`   ✓ Số tiền thanh toán: ${amount.toLocaleString('vi-VN')}đ`);
        console.log(`   ✓ Thanh toán thành công qua PayPal!`);
        
        return {
            success: true,
            method: this.name,
            amount: amount,
            transactionId: `PP${Date.now()}`,
            email: this.email
        };
    }

    getPaymentMethod() {
        return this.name;
    }
}

// Thanh toán bằng ví điện tử
class EWalletPaymentStrategy extends PaymentStrategy {
    constructor(walletType, phoneNumber) {
        super();
        this.walletType = walletType;
        this.phoneNumber = phoneNumber;
        this.name = `Ví ${walletType}`;
    }

    pay(amount, orderInfo) {
        console.log(`\n📱 [${this.name}]`);
        console.log(`   ✓ Số điện thoại: ${this.phoneNumber}`);
        console.log(`   ✓ Kiểm tra số dư ví...`);
        console.log(`   ✓ Số tiền thanh toán: ${amount.toLocaleString('vi-VN')}đ`);
        console.log(`   ✓ Đang xử lý giao dịch...`);
        console.log(`   ✓ Thanh toán thành công!`);
        
        return {
            success: true,
            method: this.name,
            amount: amount,
            transactionId: `${this.walletType.toUpperCase()}${Date.now()}`,
            phone: this.phoneNumber
        };
    }

    getPaymentMethod() {
        return this.name;
    }
}

// Thanh toán bằng tiền mặt (COD)
class CashPaymentStrategy extends PaymentStrategy {
    constructor() {
        super();
        this.name = 'Tiền mặt (COD)';
    }

    pay(amount, orderInfo) {
        console.log(`\n💵 [${this.name}]`);
        console.log(`   ✓ Số tiền cần thu: ${amount.toLocaleString('vi-VN')}đ`);
        console.log(`   ✓ Khách hàng sẽ thanh toán khi nhận hàng`);
        console.log(`   ✓ Ghi nhận đơn hàng COD thành công!`);
        
        return {
            success: true,
            method: this.name,
            amount: amount,
            transactionId: `COD${Date.now()}`
        };
    }

    getPaymentMethod() {
        return this.name;
    }
}

module.exports = {
    PaymentStrategy,
    CreditCardPaymentStrategy,
    PayPalPaymentStrategy,
    EWalletPaymentStrategy,
    CashPaymentStrategy
};
