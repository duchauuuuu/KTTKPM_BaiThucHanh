// Model cho sản phẩm
class Product {
    constructor(id, name, price, taxStrategy) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.taxStrategy = taxStrategy;
    }

    calculateTax() {
        return this.taxStrategy.calculateTax(this.price);
    }

    getTotalPrice() {
        return this.price + this.calculateTax();
    }

    getTaxInfo() {
        return {
            taxName: this.taxStrategy.getTaxName(),
            taxRate: this.taxStrategy.getTaxRate(),
            taxAmount: this.calculateTax()
        };
    }

    displayInfo() {
        const tax = this.calculateTax();
        const total = this.getTotalPrice();
        console.log(`   • ${this.name}`);
        console.log(`     - Giá: ${this.price.toLocaleString('vi-VN')}đ`);
        console.log(`     - Thuế ${this.taxStrategy.getTaxName()} (${(this.taxStrategy.getTaxRate() * 100)}%): ${tax.toLocaleString('vi-VN')}đ`);
        console.log(`     - Tổng: ${total.toLocaleString('vi-VN')}đ`);
    }
}

module.exports = Product;
