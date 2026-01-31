// Model cho đơn hàng
const { NewOrderState } = require('../state/OrderState');

class Order {
    constructor(id, customerName, address) {
        this.id = id;
        this.customerName = customerName;
        this.address = address;
        this.items = [];
        this.state = new NewOrderState();
        this.subtotal = 0;
        this.totalTax = 0;
        this.finalTotal = 0;
        this.paymentResult = null;
        this.createdAt = new Date();
    }

    addItem(product, quantity = 1) {
        this.items.push({ product, quantity });
        this._recalculate();
    }

    _recalculate() {
        this.subtotal = 0;
        this.totalTax = 0;

        this.items.forEach(item => {
            const itemPrice = item.product.price * item.quantity;
            const itemTax = item.product.calculateTax() * item.quantity;
            this.subtotal += itemPrice;
            this.totalTax += itemTax;
        });

        this.finalTotal = this.subtotal + this.totalTax;
    }

    setState(state) {
        this.state = state;
    }

    getState() {
        return this.state.getStatus();
    }

    process() {
        this.state.process(this);
    }

    cancel() {
        this.state.cancel(this);
    }

    deliver() {
        this.state.deliver(this);
    }

    setPaymentResult(result) {
        this.paymentResult = result;
    }

    displayInfo() {
        console.log(`\nTHÔNG TIN ĐƠN HÀNG`);
        console.log('-----------------------------------------------------------');
        console.log(`Mã đơn: ${this.id}`);
        console.log(`Khách hàng: ${this.customerName}`);
        console.log(`Địa chỉ: ${this.address}`);
        console.log(`Trạng thái: ${this.state.name}`);
        console.log('-----------------------------------------------------------');
        console.log(`Sản phẩm:`);
        
        this.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.product.name} (x${item.quantity})`);
            console.log(`   Giá: ${item.product.price.toLocaleString('vi-VN')}đ`);
        });

        console.log('-----------------------------------------------------------');
        console.log(`Tổng tiền hàng: ${this.subtotal.toLocaleString('vi-VN')}đ`);
        console.log(`Tổng thuế: ${this.totalTax.toLocaleString('vi-VN')}đ`);
        console.log(`TỔNG CỘNG: ${this.finalTotal.toLocaleString('vi-VN')}đ`);
        console.log('');
    }
}

module.exports = Order;
