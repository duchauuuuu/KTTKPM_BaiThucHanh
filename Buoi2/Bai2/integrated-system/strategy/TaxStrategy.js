// STRATEGY PATTERN - Chiến lược tính thuế cho sản phẩm

class TaxStrategy {
    calculateTax(price) {
        throw new Error('Phương thức calculateTax() phải được implement');
    }

    getTaxName() {
        throw new Error('Phương thức getTaxName() phải được implement');
    }

    getTaxRate() {
        throw new Error('Phương thức getTaxRate() phải được implement');
    }
}

// Thuế VAT 10%
class VATTaxStrategy extends TaxStrategy {
    constructor(rate = 0.1) {
        super();
        this.rate = rate;
        this.name = 'VAT';
    }

    calculateTax(price) {
        return price * this.rate;
    }

    getTaxName() {
        return this.name;
    }

    getTaxRate() {
        return this.rate;
    }
}

// Thuế xa xỉ 30%
class LuxuryTaxStrategy extends TaxStrategy {
    constructor(rate = 0.3) {
        super();
        this.rate = rate;
        this.name = 'Thuế xa xỉ';
    }

    calculateTax(price) {
        return price * this.rate;
    }

    getTaxName() {
        return this.name;
    }

    getTaxRate() {
        return this.rate;
    }
}

// Miễn thuế
class NoTaxStrategy extends TaxStrategy {
    constructor() {
        super();
        this.rate = 0;
        this.name = 'Miễn thuế';
    }

    calculateTax(price) {
        return 0;
    }

    getTaxName() {
        return this.name;
    }

    getTaxRate() {
        return this.rate;
    }
}

module.exports = {
    TaxStrategy,
    VATTaxStrategy,
    LuxuryTaxStrategy,
    NoTaxStrategy
};
