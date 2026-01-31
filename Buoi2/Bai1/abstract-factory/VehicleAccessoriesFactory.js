/**
 * ABSTRACT FACTORY PATTERN
 * 
 * Mục đích: Cung cấp một interface để tạo các họ (families) của các object
 * liên quan với nhau mà không cần chỉ định các class cụ thể.
 * 
 * Ứng dụng: Vehicle Accessories Factory
 * - Mỗi loại xe cần một bộ phụ kiện hoàn chỉnh: Engine + Wheel + Interior
 * - Abstract Factory đảm bảo các phụ kiện trong cùng một bộ tương thích với nhau
 * - Ví dụ: Xe hơi cần bánh lớn, xe máy cần bánh nhỏ
 */

// ==================== ABSTRACT PRODUCTS ====================

/**
 * Abstract Product: Engine (Động cơ)
 */
class Engine {
    constructor() {
        if (new.target === Engine) {
            throw new Error('Không thể khởi tạo trực tiếp Engine!');
        }
    }

    start() { throw new Error('Phải override start()!'); }
    stop() { throw new Error('Phải override stop()!'); }
    getSpecs() { throw new Error('Phải override getSpecs()!'); }
}

/**
 * Abstract Product: Wheel (Bánh xe)
 */
class Wheel {
    constructor() {
        if (new.target === Wheel) {
            throw new Error('Không thể khởi tạo trực tiếp Wheel!');
        }
    }

    getSize() { throw new Error('Phải override getSize()!'); }
    getType() { throw new Error('Phải override getType()!'); }
    getSpecs() { throw new Error('Phải override getSpecs()!'); }
}

/**
 * Abstract Product: Interior (Nội thất)
 */
class Interior {
    constructor() {
        if (new.target === Interior) {
            throw new Error('Không thể khởi tạo trực tiếp Interior!');
        }
    }

    getMaterial() { throw new Error('Phải override getMaterial()!'); }
    getFeatures() { throw new Error('Phải override getFeatures()!'); }
    getSpecs() { throw new Error('Phải override getSpecs()!'); }
}

// ==================== CAR PRODUCTS ====================

class CarEngine extends Engine {
    constructor(specs = {}) {
        super();
        this.type = 'Car Engine';
        this.horsepower = specs.horsepower || 150;
        this.cylinders = specs.cylinders || 4;
        this.fuelType = specs.fuelType || 'Gasoline';
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        console.log(`🔧 CarEngine: Động cơ ${this.cylinders} xi-lanh ${this.horsepower}HP khởi động!`);
        return this;
    }

    stop() {
        this.isRunning = false;
        console.log('🔧 CarEngine: Động cơ đã tắt');
    }

    getSpecs() {
        return {
            type: this.type,
            horsepower: this.horsepower,
            cylinders: this.cylinders,
            fuelType: this.fuelType
        };
    }
}

class CarWheel extends Wheel {
    constructor(specs = {}) {
        super();
        this.type = 'Car Wheel';
        this.diameter = specs.diameter || 17; // inches
        this.width = specs.width || 225; // mm
        this.brand = specs.brand || 'Michelin';
    }

    getSize() {
        return `${this.width}/${this.diameter}R`;
    }

    getType() {
        return this.type;
    }

    getSpecs() {
        return {
            type: this.type,
            size: this.getSize(),
            diameter: `${this.diameter} inches`,
            width: `${this.width} mm`,
            brand: this.brand
        };
    }
}

class CarInterior extends Interior {
    constructor(specs = {}) {
        super();
        this.type = 'Car Interior';
        this.material = specs.material || 'Leather';
        this.features = specs.features || ['Air Conditioning', 'Sound System', 'Navigation'];
        this.seats = specs.seats || 5;
    }

    getMaterial() {
        return this.material;
    }

    getFeatures() {
        return this.features;
    }

    getSpecs() {
        return {
            type: this.type,
            material: this.material,
            features: this.features,
            seats: this.seats
        };
    }
}

// ==================== MOTORCYCLE PRODUCTS ====================

class MotorcycleEngine extends Engine {
    constructor(specs = {}) {
        super();
        this.type = 'Motorcycle Engine';
        this.cc = specs.cc || 150;
        this.horsepower = specs.horsepower || 15;
        this.cooling = specs.cooling || 'Air-cooled';
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        console.log(`🔧 MotorcycleEngine: Động cơ ${this.cc}cc khởi động!`);
        return this;
    }

    stop() {
        this.isRunning = false;
        console.log('🔧 MotorcycleEngine: Động cơ đã tắt');
    }

    getSpecs() {
        return {
            type: this.type,
            cc: this.cc,
            horsepower: this.horsepower,
            cooling: this.cooling
        };
    }
}

class MotorcycleWheel extends Wheel {
    constructor(specs = {}) {
        super();
        this.type = 'Motorcycle Wheel';
        this.diameter = specs.diameter || 17; // inches
        this.width = specs.width || 100; // mm
        this.brand = specs.brand || 'IRC';
    }

    getSize() {
        return `${this.width}/${this.diameter}`;
    }

    getType() {
        return this.type;
    }

    getSpecs() {
        return {
            type: this.type,
            size: this.getSize(),
            diameter: `${this.diameter} inches`,
            width: `${this.width} mm`,
            brand: this.brand
        };
    }
}

class MotorcycleInterior extends Interior {
    constructor(specs = {}) {
        super();
        this.type = 'Motorcycle Interior';
        this.material = specs.material || 'Vinyl';
        this.features = specs.features || ['Digital Speedometer', 'USB Charging'];
        this.seatType = specs.seatType || 'Single';
    }

    getMaterial() {
        return this.material;
    }

    getFeatures() {
        return this.features;
    }

    getSpecs() {
        return {
            type: this.type,
            material: this.material,
            features: this.features,
            seatType: this.seatType
        };
    }
}

// ==================== TRUCK PRODUCTS ====================

class TruckEngine extends Engine {
    constructor(specs = {}) {
        super();
        this.type = 'Truck Engine';
        this.horsepower = specs.horsepower || 300;
        this.cylinders = specs.cylinders || 6;
        this.fuelType = specs.fuelType || 'Diesel';
        this.torque = specs.torque || 700; // Nm
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        console.log(`🔧 TruckEngine: Động cơ diesel ${this.horsepower}HP - ${this.torque}Nm khởi động!`);
        return this;
    }

    stop() {
        this.isRunning = false;
        console.log('🔧 TruckEngine: Động cơ đã tắt');
    }

    getSpecs() {
        return {
            type: this.type,
            horsepower: this.horsepower,
            cylinders: this.cylinders,
            fuelType: this.fuelType,
            torque: `${this.torque} Nm`
        };
    }
}

class TruckWheel extends Wheel {
    constructor(specs = {}) {
        super();
        this.type = 'Truck Wheel';
        this.diameter = specs.diameter || 22.5; // inches
        this.width = specs.width || 315; // mm
        this.brand = specs.brand || 'Bridgestone';
        this.loadRating = specs.loadRating || 'H'; // Heavy
    }

    getSize() {
        return `${this.width}/${this.diameter}R`;
    }

    getType() {
        return this.type;
    }

    getSpecs() {
        return {
            type: this.type,
            size: this.getSize(),
            diameter: `${this.diameter} inches`,
            width: `${this.width} mm`,
            brand: this.brand,
            loadRating: this.loadRating
        };
    }
}

class TruckInterior extends Interior {
    constructor(specs = {}) {
        super();
        this.type = 'Truck Interior';
        this.material = specs.material || 'Fabric';
        this.features = specs.features || ['Air Conditioning', 'CB Radio', 'Sleeper Cabin'];
        this.cabinType = specs.cabinType || 'Standard';
    }

    getMaterial() {
        return this.material;
    }

    getFeatures() {
        return this.features;
    }

    getSpecs() {
        return {
            type: this.type,
            material: this.material,
            features: this.features,
            cabinType: this.cabinType
        };
    }
}

// ==================== ABSTRACT FACTORY ====================

/**
 * Abstract Factory Interface
 */
class VehicleAccessoriesFactory {
    createEngine() {
        throw new Error('Phải override createEngine()!');
    }

    createWheel() {
        throw new Error('Phải override createWheel()!');
    }

    createInterior() {
        throw new Error('Phải override createInterior()!');
    }

    /**
     * Tạo bộ phụ kiện hoàn chỉnh
     * @returns {Object} Bộ phụ kiện
     */
    createFullSet() {
        return {
            engine: this.createEngine(),
            wheel: this.createWheel(),
            interior: this.createInterior()
        };
    }
}

// ==================== CONCRETE FACTORIES ====================

class CarAccessoriesFactory extends VehicleAccessoriesFactory {
    constructor(specs = {}) {
        super();
        this.specs = specs;
    }

    createEngine() {
        console.log('🏭 CarAccessoriesFactory: Tạo Car Engine');
        return new CarEngine(this.specs.engine);
    }

    createWheel() {
        console.log('🏭 CarAccessoriesFactory: Tạo Car Wheel');
        return new CarWheel(this.specs.wheel);
    }

    createInterior() {
        console.log('🏭 CarAccessoriesFactory: Tạo Car Interior');
        return new CarInterior(this.specs.interior);
    }
}

class MotorcycleAccessoriesFactory extends VehicleAccessoriesFactory {
    constructor(specs = {}) {
        super();
        this.specs = specs;
    }

    createEngine() {
        console.log('🏭 MotorcycleAccessoriesFactory: Tạo Motorcycle Engine');
        return new MotorcycleEngine(this.specs.engine);
    }

    createWheel() {
        console.log('🏭 MotorcycleAccessoriesFactory: Tạo Motorcycle Wheel');
        return new MotorcycleWheel(this.specs.wheel);
    }

    createInterior() {
        console.log('🏭 MotorcycleAccessoriesFactory: Tạo Motorcycle Interior');
        return new MotorcycleInterior(this.specs.interior);
    }
}

class TruckAccessoriesFactory extends VehicleAccessoriesFactory {
    constructor(specs = {}) {
        super();
        this.specs = specs;
    }

    createEngine() {
        console.log('🏭 TruckAccessoriesFactory: Tạo Truck Engine');
        return new TruckEngine(this.specs.engine);
    }

    createWheel() {
        console.log('🏭 TruckAccessoriesFactory: Tạo Truck Wheel');
        return new TruckWheel(this.specs.wheel);
    }

    createInterior() {
        console.log('🏭 TruckAccessoriesFactory: Tạo Truck Interior');
        return new TruckInterior(this.specs.interior);
    }
}

// ==================== FACTORY PROVIDER ====================

/**
 * Provider để lấy factory phù hợp
 */
class AccessoriesFactoryProvider {
    static getFactory(vehicleType, specs = {}) {
        switch (vehicleType.toLowerCase()) {
            case 'car':
                return new CarAccessoriesFactory(specs);
            case 'motorcycle':
            case 'motorbike':
                return new MotorcycleAccessoriesFactory(specs);
            case 'truck':
                return new TruckAccessoriesFactory(specs);
            default:
                throw new Error(`Không hỗ trợ phụ kiện cho loại xe: ${vehicleType}`);
        }
    }
}

module.exports = {
    // Abstract Factory
    VehicleAccessoriesFactory,
    // Concrete Factories
    CarAccessoriesFactory,
    MotorcycleAccessoriesFactory,
    TruckAccessoriesFactory,
    // Provider
    AccessoriesFactoryProvider,
    // Products (export để có thể sử dụng trực tiếp nếu cần)
    CarEngine, CarWheel, CarInterior,
    MotorcycleEngine, MotorcycleWheel, MotorcycleInterior,
    TruckEngine, TruckWheel, TruckInterior
};
