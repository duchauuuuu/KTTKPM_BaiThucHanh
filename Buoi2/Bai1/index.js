/**
 * Các Design Patterns được áp dụng:
 * 1. Singleton - VehicleRegistry: Quản lý đăng ký phương tiện tập trung
 * 2. Factory Method - VehicleFactory: Tạo các loại phương tiện khác nhau
 * 3. Abstract Factory - VehicleAccessoriesFactory: Tạo bộ phụ kiện cho từng loại xe
 */

const VehicleRegistry = require('./singleton/VehicleRegistry');
const { VehicleFactory } = require('./factory-method/VehicleFactory');
const { AccessoriesFactoryProvider } = require('./abstract-factory/VehicleAccessoriesFactory');

// ==================== DEMO SINGLETON PATTERN ====================
function demoSingleton() {
    console.log('\n' + '='.repeat(60));
    console.log('📌 DEMO SINGLETON PATTERN - VehicleRegistry');
    console.log('='.repeat(60));

    // Tạo instance đầu tiên
    const registry1 = VehicleRegistry.getInstance();
    console.log('\n👉 Tạo registry1 bằng getInstance()');

    // Tạo instance thứ hai (sẽ trả về cùng instance)
    const registry2 = new VehicleRegistry();
    console.log('👉 Tạo registry2 bằng new VehicleRegistry()');

    // Kiểm tra 2 instance có giống nhau không
    console.log(`\n🔍 registry1 === registry2: ${registry1 === registry2}`);
    console.log('✅ Singleton đảm bảo chỉ có DUY NHẤT một instance!\n');

    return registry1;
}

// ==================== DEMO FACTORY METHOD PATTERN ====================
function demoFactoryMethod() {
    console.log('\n' + '='.repeat(60));
    console.log('📌 DEMO FACTORY METHOD PATTERN - VehicleFactory');
    console.log('='.repeat(60));

    console.log('\n📋 Các loại xe được hỗ trợ:', VehicleFactory.getSupportedTypes());

    // Tạo các loại xe khác nhau
    const car = VehicleFactory.createVehicle('car', {
        brand: 'Toyota',
        model: 'Camry',
        year: 2024,
        color: 'Black',
        seats: 5,
        transmission: 'automatic'
    });

    const motorcycle = VehicleFactory.createVehicle('motorcycle', {
        brand: 'Honda',
        model: 'Winner X',
        year: 2024,
        color: 'Red',
        engineCC: 150,
        style: 'sport'
    });

    const truck = VehicleFactory.createVehicle('truck', {
        brand: 'Hyundai',
        model: 'HD700',
        year: 2024,
        color: 'White',
        loadCapacity: 7000,
        axles: 2
    });

    const bus = VehicleFactory.createVehicle('bus', {
        brand: 'Thaco',
        model: 'City Bus',
        year: 2024,
        passengerCapacity: 50,
        route: '01'
    });

    console.log('\n📊 Thông tin các xe đã tạo:');
    console.log('Car:', car.getInfo());
    console.log('Motorcycle:', motorcycle.getInfo());
    console.log('Truck:', truck.getInfo());
    console.log('Bus:', bus.getInfo());

    // Demo các chức năng riêng
    console.log('\n🚀 Demo chức năng:');
    car.start();
    motorcycle.start();
    motorcycle.wheelie();
    truck.loadCargo(5000);
    bus.announceStop('Bến xe Miền Đông');

    return { car, motorcycle, truck, bus };
}

// ==================== DEMO ABSTRACT FACTORY PATTERN ====================
function demoAbstractFactory() {
    console.log('\n' + '='.repeat(60));
    console.log('📌 DEMO ABSTRACT FACTORY PATTERN - VehicleAccessoriesFactory');
    console.log('='.repeat(60));

    // Tạo bộ phụ kiện cho xe hơi
    console.log('\n🚗 Tạo bộ phụ kiện cho CAR:');
    const carFactory = AccessoriesFactoryProvider.getFactory('car', {
        engine: { horsepower: 200, cylinders: 4 },
        wheel: { diameter: 18, brand: 'Michelin' },
        interior: { material: 'Premium Leather', seats: 5 }
    });
    const carAccessories = carFactory.createFullSet();

    // Tạo bộ phụ kiện cho xe máy
    console.log('\n🏍️ Tạo bộ phụ kiện cho MOTORCYCLE:');
    const motorcycleFactory = AccessoriesFactoryProvider.getFactory('motorcycle', {
        engine: { cc: 250, cooling: 'Liquid-cooled' },
        wheel: { diameter: 17, brand: 'Pirelli' },
        interior: { features: ['LED Display', 'ABS'] }
    });
    const motorcycleAccessories = motorcycleFactory.createFullSet();

    // Tạo bộ phụ kiện cho xe tải
    console.log('\n🚚 Tạo bộ phụ kiện cho TRUCK:');
    const truckFactory = AccessoriesFactoryProvider.getFactory('truck', {
        engine: { horsepower: 400, torque: 1200 },
        wheel: { diameter: 22.5, loadRating: 'XH' },
        interior: { cabinType: 'Sleeper' }
    });
    const truckAccessories = truckFactory.createFullSet();

    console.log('\n📊 Chi tiết phụ kiện:');
    console.log('\n--- CAR ACCESSORIES ---');
    console.log('Engine:', carAccessories.engine.getSpecs());
    console.log('Wheel:', carAccessories.wheel.getSpecs());
    console.log('Interior:', carAccessories.interior.getSpecs());

    console.log('\n--- MOTORCYCLE ACCESSORIES ---');
    console.log('Engine:', motorcycleAccessories.engine.getSpecs());
    console.log('Wheel:', motorcycleAccessories.wheel.getSpecs());
    console.log('Interior:', motorcycleAccessories.interior.getSpecs());

    console.log('\n--- TRUCK ACCESSORIES ---');
    console.log('Engine:', truckAccessories.engine.getSpecs());
    console.log('Wheel:', truckAccessories.wheel.getSpecs());
    console.log('Interior:', truckAccessories.interior.getSpecs());

    return { carAccessories, motorcycleAccessories, truckAccessories };
}

// ==================== DEMO TỔNG HỢP ====================
function demoIntegration() {
    console.log('\n' + '='.repeat(60));
    console.log('📌 DEMO TỔNG HỢP - Kết hợp tất cả Patterns');
    console.log('='.repeat(60));

    // 1. Lấy Registry (Singleton)
    const registry = VehicleRegistry.getInstance();

    // 2. Tạo xe bằng Factory Method
    console.log('\n📦 Tạo các phương tiện:');
    const vehicles = [
        { type: 'car', specs: { brand: 'Mercedes', model: 'C300', color: 'Silver' }, plate: '51A-123.45' },
        { type: 'motorcycle', specs: { brand: 'Yamaha', model: 'Exciter', engineCC: 155 }, plate: '59P1-678.90' },
        { type: 'truck', specs: { brand: 'Isuzu', model: 'FRR90', loadCapacity: 8000 }, plate: '51D-111.22' }
    ];

    vehicles.forEach(v => {
        const vehicle = VehicleFactory.createVehicle(v.type, v.specs);
        registry.registerVehicle(v.plate, vehicle);
    });

    // 3. Tạo phụ kiện bằng Abstract Factory
    console.log('\n🔧 Tạo phụ kiện cho từng xe:');
    vehicles.forEach(v => {
        const registration = registry.findVehicle(v.plate);
        const factory = AccessoriesFactoryProvider.getFactory(v.type);
        const accessories = factory.createFullSet();
        
        // Gắn phụ kiện vào xe
        registration.accessories = accessories;
        console.log(`✅ Đã gắn phụ kiện cho ${v.plate}`);
    });

    // 4. Hiển thị thống kê
    console.log('\n📊 Thống kê Registry:');
    console.log(registry.getStatistics());

    console.log('\n📜 Lịch sử đăng ký:');
    console.log(registry.getHistory());

    // 5. Tìm kiếm và sử dụng
    console.log('\n🔍 Tìm kiếm xe:');
    const foundVehicle = registry.findVehicle('51A-123.45');
    console.log('Thông tin xe:', foundVehicle.vehicle.getInfo());
    console.log('Động cơ:', foundVehicle.accessories.engine.getSpecs());

    return registry;
}

// ==================== MAIN ====================
function main() {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║     BÀI 1: DESIGN PATTERNS - VEHICLE MANAGEMENT SYSTEM     ║');
    console.log('║         Singleton | Factory Method | Abstract Factory      ║');
    console.log('╚════════════════════════════════════════════════════════════╝');

    // Demo từng pattern
    demoSingleton();
    demoFactoryMethod();
    demoAbstractFactory();

    // Demo tổng hợp
    demoIntegration();

    console.log('\n' + '='.repeat(60));
    console.log('✅ HOÀN THÀNH DEMO TẤT CẢ CÁC DESIGN PATTERNS!');
    console.log('='.repeat(60));
}

// Chạy chương trình
main();

module.exports = {
    VehicleRegistry,
    VehicleFactory,
    AccessoriesFactoryProvider
};
