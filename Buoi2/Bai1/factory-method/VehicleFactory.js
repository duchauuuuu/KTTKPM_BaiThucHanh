/**
 * FACTORY METHOD PATTERN
 * 
 * Mục đích: Định nghĩa một interface để tạo object, nhưng để các subclass
 * quyết định class nào sẽ được khởi tạo.
 * 
 * Ứng dụng: Vehicle Factory - Tạo các loại phương tiện giao thông
 * - Tạo các loại xe khác nhau (Car, Motorcycle, Truck, Bus)
 * - Client code không cần biết chi tiết về việc tạo từng loại xe
 */

// ==================== ABSTRACT PRODUCT ====================
/**
 * Abstract class cho Vehicle (Phương tiện)
 */
class Vehicle {
    constructor(specs) {
        if (new.target === Vehicle) {
            throw new Error('Không thể khởi tạo trực tiếp Vehicle!');
        }
        this.specs = specs;
        this.brand = specs.brand || 'Unknown';
        this.model = specs.model || 'Unknown';
        this.year = specs.year || new Date().getFullYear();
        this.color = specs.color || 'White';
        this.isRunning = false;
    }

    // Các phương thức abstract
    getType() {
        throw new Error('Phương thức getType() phải được override!');
    }

    start() {
        throw new Error('Phương thức start() phải được override!');
    }

    stop() {
        throw new Error('Phương thức stop() phải được override!');
    }

    getInfo() {
        throw new Error('Phương thức getInfo() phải được override!');
    }

    getFuelConsumption() {
        throw new Error('Phương thức getFuelConsumption() phải được override!');
    }
}

// ==================== CONCRETE PRODUCTS ====================

/**
 * Car - Xe ô tô con
 */
class Car extends Vehicle {
    constructor(specs) {
        super(specs);
        this.type = 'Car';
        this.seats = specs.seats || 5;
        this.transmission = specs.transmission || 'automatic';
        this.fuelType = specs.fuelType || 'gasoline';
    }

    getType() {
        return this.type;
    }

    start() {
        console.log(`🚗 ${this.brand} ${this.model}: Khởi động động cơ...`);
        this.isRunning = true;
        console.log(`🚗 ${this.brand} ${this.model}: Xe đã sẵn sàng di chuyển!`);
        return this;
    }

    stop() {
        console.log(`🚗 ${this.brand} ${this.model}: Đang dừng xe...`);
        this.isRunning = false;
        console.log(`🚗 ${this.brand} ${this.model}: Xe đã tắt máy!`);
    }

    getInfo() {
        return {
            type: this.type,
            brand: this.brand,
            model: this.model,
            year: this.year,
            color: this.color,
            seats: this.seats,
            transmission: this.transmission,
            fuelType: this.fuelType,
            isRunning: this.isRunning
        };
    }

    getFuelConsumption() {
        // Tiêu thụ trung bình cho xe hơi: 7-10 lít/100km
        return `${7 + Math.random() * 3} lít/100km`;
    }

    // Phương thức riêng của Car
    openTrunk() {
        console.log(`🚗 ${this.brand} ${this.model}: Mở cốp xe`);
    }
}

/**
 * Motorcycle - Xe máy
 */
class Motorcycle extends Vehicle {
    constructor(specs) {
        super(specs);
        this.type = 'Motorcycle';
        this.engineCC = specs.engineCC || 150;
        this.style = specs.style || 'standard'; // sport, cruiser, scooter
    }

    getType() {
        return this.type;
    }

    start() {
        console.log(`🏍️ ${this.brand} ${this.model}: Đề máy...`);
        this.isRunning = true;
        console.log(`🏍️ ${this.brand} ${this.model}: Xe máy đã nổ máy!`);
        return this;
    }

    stop() {
        console.log(`🏍️ ${this.brand} ${this.model}: Tắt máy...`);
        this.isRunning = false;
        console.log(`🏍️ ${this.brand} ${this.model}: Xe đã tắt!`);
    }

    getInfo() {
        return {
            type: this.type,
            brand: this.brand,
            model: this.model,
            year: this.year,
            color: this.color,
            engineCC: this.engineCC,
            style: this.style,
            isRunning: this.isRunning
        };
    }

    getFuelConsumption() {
        // Tiêu thụ trung bình cho xe máy: 2-4 lít/100km
        return `${2 + Math.random() * 2} lít/100km`;
    }

    // Phương thức riêng của Motorcycle
    wheelie() {
        if (this.isRunning) {
            console.log(`🏍️ ${this.brand} ${this.model}: Bốc đầu! 🔥`);
        } else {
            console.log(`🏍️ Xe chưa nổ máy, không thể bốc đầu!`);
        }
    }
}

/**
 * Truck - Xe tải
 */
class Truck extends Vehicle {
    constructor(specs) {
        super(specs);
        this.type = 'Truck';
        this.loadCapacity = specs.loadCapacity || 5000; // kg
        this.axles = specs.axles || 2;
    }

    getType() {
        return this.type;
    }

    start() {
        console.log(`🚚 ${this.brand} ${this.model}: Khởi động động cơ diesel...`);
        this.isRunning = true;
        console.log(`🚚 ${this.brand} ${this.model}: Xe tải sẵn sàng vận chuyển!`);
        return this;
    }

    stop() {
        console.log(`🚚 ${this.brand} ${this.model}: Phanh và tắt máy...`);
        this.isRunning = false;
        console.log(`🚚 ${this.brand} ${this.model}: Xe tải đã dừng!`);
    }

    getInfo() {
        return {
            type: this.type,
            brand: this.brand,
            model: this.model,
            year: this.year,
            color: this.color,
            loadCapacity: `${this.loadCapacity} kg`,
            axles: this.axles,
            isRunning: this.isRunning
        };
    }

    getFuelConsumption() {
        // Tiêu thụ trung bình cho xe tải: 15-25 lít/100km
        return `${15 + Math.random() * 10} lít/100km`;
    }

    // Phương thức riêng của Truck
    loadCargo(weight) {
        if (weight <= this.loadCapacity) {
            console.log(`🚚 ${this.brand} ${this.model}: Đã chất ${weight}kg hàng hóa`);
            return true;
        } else {
            console.log(`🚚 Quá tải! Giới hạn: ${this.loadCapacity}kg`);
            return false;
        }
    }
}

/**
 * Bus - Xe buýt
 */
class Bus extends Vehicle {
    constructor(specs) {
        super(specs);
        this.type = 'Bus';
        this.passengerCapacity = specs.passengerCapacity || 45;
        this.route = specs.route || 'N/A';
    }

    getType() {
        return this.type;
    }

    start() {
        console.log(`🚌 ${this.brand} ${this.model}: Khởi động xe buýt...`);
        this.isRunning = true;
        console.log(`🚌 ${this.brand} ${this.model}: Xe buýt tuyến ${this.route} đã sẵn sàng!`);
        return this;
    }

    stop() {
        console.log(`🚌 ${this.brand} ${this.model}: Xe buýt đang dừng đỗ...`);
        this.isRunning = false;
        console.log(`🚌 ${this.brand} ${this.model}: Xe buýt đã tắt máy!`);
    }

    getInfo() {
        return {
            type: this.type,
            brand: this.brand,
            model: this.model,
            year: this.year,
            color: this.color,
            passengerCapacity: this.passengerCapacity,
            route: this.route,
            isRunning: this.isRunning
        };
    }

    getFuelConsumption() {
        // Tiêu thụ trung bình cho xe buýt: 25-35 lít/100km
        return `${25 + Math.random() * 10} lít/100km`;
    }

    // Phương thức riêng của Bus
    announceStop(stopName) {
        console.log(`🚌 Thông báo: Trạm tiếp theo - ${stopName}`);
    }
}

// ==================== FACTORY ====================

/**
 * Factory Method để tạo Vehicle
 */
class VehicleFactory {
    /**
     * Factory Method - Tạo phương tiện dựa vào type
     * @param {string} type - Loại phương tiện ('car', 'motorcycle', 'truck', 'bus')
     * @param {Object} specs - Thông số kỹ thuật
     * @returns {Vehicle}
     */
    static createVehicle(type, specs) {
        switch (type.toLowerCase()) {
            case 'car':
                console.log('\n🏭 Factory: Đang sản xuất Car...');
                return new Car(specs);

            case 'motorcycle':
            case 'motorbike':
                console.log('\n🏭 Factory: Đang sản xuất Motorcycle...');
                return new Motorcycle(specs);

            case 'truck':
                console.log('\n🏭 Factory: Đang sản xuất Truck...');
                return new Truck(specs);

            case 'bus':
                console.log('\n🏭 Factory: Đang sản xuất Bus...');
                return new Bus(specs);

            default:
                throw new Error(`Không hỗ trợ loại phương tiện: ${type}`);
        }
    }

    /**
     * Lấy danh sách các loại phương tiện được hỗ trợ
     * @returns {Array}
     */
    static getSupportedTypes() {
        return ['car', 'motorcycle', 'truck', 'bus'];
    }

    /**
     * Tạo phương tiện với cấu hình mặc định
     * @param {string} type - Loại phương tiện
     * @returns {Vehicle}
     */
    static createDefaultVehicle(type) {
        const defaultSpecs = {
            car: { brand: 'Toyota', model: 'Camry', year: 2024, color: 'White' },
            motorcycle: { brand: 'Honda', model: 'Wave', year: 2024, engineCC: 110 },
            truck: { brand: 'Hyundai', model: 'HD700', year: 2024, loadCapacity: 7000 },
            bus: { brand: 'Thaco', model: 'City Bus', year: 2024, passengerCapacity: 50 }
        };

        const specs = defaultSpecs[type.toLowerCase()];
        if (!specs) {
            throw new Error(`Không có cấu hình mặc định cho: ${type}`);
        }

        return VehicleFactory.createVehicle(type, specs);
    }
}

module.exports = {
    VehicleFactory,
    Vehicle,
    Car,
    Motorcycle,
    Truck,
    Bus
};
