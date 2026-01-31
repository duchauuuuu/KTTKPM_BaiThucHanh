// DECORATOR PATTERN - Thêm tính năng bổ sung cho thanh toán

// Component cơ bản
class PaymentComponent {
    getAmount() {
        throw new Error('Phương thức getAmount() phải được implement');
    }

    getDescription() {
        throw new Error('Phương thức getDescription() phải được implement');
    }

    getBreakdown() {
        throw new Error('Phương thức getBreakdown() phải được implement');
    }
}

// Concrete Component - Thanh toán cơ bản
class BasicPayment extends PaymentComponent {
    constructor(baseAmount, description = 'Tổng tiền hàng') {
        super();
        this.baseAmount = baseAmount;
        this.description = description;
    }

    getAmount() {
        return this.baseAmount;
    }

    getDescription() {
        return this.description;
    }

    getBreakdown() {
        return [{
            name: this.description,
            amount: this.baseAmount
        }];
    }

    getBaseAmount() {
        return this.baseAmount;
    }
}

// Base Decorator
class PaymentDecorator extends PaymentComponent {
    constructor(paymentComponent) {
        super();
        this.paymentComponent = paymentComponent;
    }

    getAmount() {
        return this.paymentComponent.getAmount();
    }

    getDescription() {
        return this.paymentComponent.getDescription();
    }

    getBreakdown() {
        return this.paymentComponent.getBreakdown();
    }
}

// Decorator 1: Phí xử lý thanh toán
class ProcessingFeeDecorator extends PaymentDecorator {
    constructor(paymentComponent, feeRate = 0.03) {
        super(paymentComponent);
        this.feeRate = feeRate;
        this.name = 'Phí xử lý thanh toán';
    }

    getAmount() {
        const baseAmount = this._getBaseAmount();
        const fee = baseAmount * this.feeRate;
        return this.paymentComponent.getAmount() + fee;
    }

    getDescription() {
        return `${this.paymentComponent.getDescription()} + ${this.name}`;
    }

    getBreakdown() {
        const breakdown = [...this.paymentComponent.getBreakdown()];
        const baseAmount = this._getBaseAmount();
        const fee = baseAmount * this.feeRate;
        breakdown.push({
            name: `${this.name} (${(this.feeRate * 100)}%)`,
            amount: fee
        });
        return breakdown;
    }

    _getBaseAmount() {
        let component = this.paymentComponent;
        while (component.paymentComponent) {
            component = component.paymentComponent;
        }
        return component.getBaseAmount();
    }
}

// Decorator 2: Mã giảm giá
class DiscountCodeDecorator extends PaymentDecorator {
    constructor(paymentComponent, discountCode, discountRate = 0.1) {
        super(paymentComponent);
        this.discountCode = discountCode;
        this.discountRate = discountRate;
        this.name = 'Mã giảm giá';
    }

    getAmount() {
        const currentAmount = this.paymentComponent.getAmount();
        const discount = currentAmount * this.discountRate;
        return currentAmount - discount;
    }

    getDescription() {
        return `${this.paymentComponent.getDescription()} + ${this.name}`;
    }

    getBreakdown() {
        const breakdown = [...this.paymentComponent.getBreakdown()];
        const currentAmount = this.paymentComponent.getAmount();
        const discount = currentAmount * this.discountRate;
        breakdown.push({
            name: `${this.name}: ${this.discountCode} (-${(this.discountRate * 100)}%)`,
            amount: -discount
        });
        return breakdown;
    }
}

// Decorator 3: Phí vận chuyển
class ShippingFeeDecorator extends PaymentDecorator {
    constructor(paymentComponent, shippingFee = 30000) {
        super(paymentComponent);
        this.shippingFee = shippingFee;
        this.name = 'Phí vận chuyển';
    }

    getAmount() {
        return this.paymentComponent.getAmount() + this.shippingFee;
    }

    getDescription() {
        return `${this.paymentComponent.getDescription()} + ${this.name}`;
    }

    getBreakdown() {
        const breakdown = [...this.paymentComponent.getBreakdown()];
        breakdown.push({
            name: this.name,
            amount: this.shippingFee
        });
        return breakdown;
    }
}

// Decorator 4: Phí giao hàng nhanh
class ExpressDeliveryDecorator extends PaymentDecorator {
    constructor(paymentComponent, expressFee = 50000) {
        super(paymentComponent);
        this.expressFee = expressFee;
        this.name = 'Phí giao hàng nhanh';
    }

    getAmount() {
        return this.paymentComponent.getAmount() + this.expressFee;
    }

    getDescription() {
        return `${this.paymentComponent.getDescription()} + ${this.name}`;
    }

    getBreakdown() {
        const breakdown = [...this.paymentComponent.getBreakdown()];
        breakdown.push({
            name: this.name,
            amount: this.expressFee
        });
        return breakdown;
    }
}

// Decorator 5: Bảo hiểm đơn hàng
class InsuranceFeeDecorator extends PaymentDecorator {
    constructor(paymentComponent, insuranceRate = 0.02) {
        super(paymentComponent);
        this.insuranceRate = insuranceRate;
        this.name = 'Bảo hiểm đơn hàng';
    }

    getAmount() {
        const baseAmount = this._getBaseAmount();
        const insurance = baseAmount * this.insuranceRate;
        return this.paymentComponent.getAmount() + insurance;
    }

    getDescription() {
        return `${this.paymentComponent.getDescription()} + ${this.name}`;
    }

    getBreakdown() {
        const breakdown = [...this.paymentComponent.getBreakdown()];
        const baseAmount = this._getBaseAmount();
        const insurance = baseAmount * this.insuranceRate;
        breakdown.push({
            name: `${this.name} (${(this.insuranceRate * 100)}%)`,
            amount: insurance
        });
        return breakdown;
    }

    _getBaseAmount() {
        let component = this.paymentComponent;
        while (component.paymentComponent) {
            component = component.paymentComponent;
        }
        return component.getBaseAmount();
    }
}

// Decorator 6: Điểm thưởng thành viên
class LoyaltyPointsDecorator extends PaymentDecorator {
    constructor(paymentComponent, points, pointValue = 1000) {
        super(paymentComponent);
        this.points = points;
        this.pointValue = pointValue; // 1 điểm = 1000đ
        this.name = 'Sử dụng điểm thưởng';
    }

    getAmount() {
        const discount = this.points * this.pointValue;
        return Math.max(0, this.paymentComponent.getAmount() - discount);
    }

    getDescription() {
        return `${this.paymentComponent.getDescription()} + ${this.name}`;
    }

    getBreakdown() {
        const breakdown = [...this.paymentComponent.getBreakdown()];
        const discount = this.points * this.pointValue;
        breakdown.push({
            name: `${this.name} (${this.points} điểm)`,
            amount: -discount
        });
        return breakdown;
    }
}

module.exports = {
    BasicPayment,
    ProcessingFeeDecorator,
    DiscountCodeDecorator,
    ShippingFeeDecorator,
    ExpressDeliveryDecorator,
    InsuranceFeeDecorator,
    LoyaltyPointsDecorator
};
