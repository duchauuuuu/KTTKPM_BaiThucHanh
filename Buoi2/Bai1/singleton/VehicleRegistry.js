/* SINGLETON PATTERN
 */

class VehicleRegistry {
    // Biến static để lưu instance duy nhất
    static instance = null;

    constructor() {
        // Kiểm tra nếu đã có instance tồn tại
        if (VehicleRegistry.instance) {
            return VehicleRegistry.instance;
        }

        // Khởi tạo các thuộc tính
        this.vehicles = new Map();
        this.totalRegistered = 0;
        this.registrationHistory = [];

        console.log('🚗 VehicleRegistry được khởi tạo (Singleton)');

        // Lưu instance vào biến static
        VehicleRegistry.instance = this;
    }

    /**
     * Phương thức static để lấy instance
     * @returns {VehicleRegistry}
     */
    static getInstance() {
        if (!VehicleRegistry.instance) {
            VehicleRegistry.instance = new VehicleRegistry();
        }
        return VehicleRegistry.instance;
    }

    /**
     * Đăng ký một phương tiện mới
     * @param {string} licensePlate - Biển số xe
     * @param {Object} vehicle - Object phương tiện
     */
    registerVehicle(licensePlate, vehicle) {
        // Kiểm tra biển số đã tồn tại chưa
        if (this.vehicles.has(licensePlate)) {
            throw new Error(`Biển số ${licensePlate} đã được đăng ký!`);
        }

        // Thêm thông tin đăng ký
        const registration = {
            vehicle: vehicle,
            registeredAt: new Date(),
            status: 'active'
        };

        this.vehicles.set(licensePlate, registration);
        this.totalRegistered++;
        
        // Lưu lịch sử
        this.registrationHistory.push({
            action: 'register',
            licensePlate: licensePlate,
            vehicleType: vehicle.getType(),
            timestamp: new Date()
        });

        console.log(`✅ Đã đăng ký: ${licensePlate} - ${vehicle.getType()} (Tổng: ${this.totalRegistered})`);
        return registration;
    }

    /**
     * Hủy đăng ký phương tiện
     * @param {string} licensePlate - Biển số xe
     */
    unregisterVehicle(licensePlate) {
        if (!this.vehicles.has(licensePlate)) {
            throw new Error(`Không tìm thấy phương tiện với biển số: ${licensePlate}`);
        }

        const registration = this.vehicles.get(licensePlate);
        registration.status = 'inactive';
        registration.unregisteredAt = new Date();

        // Lưu lịch sử
        this.registrationHistory.push({
            action: 'unregister',
            licensePlate: licensePlate,
            timestamp: new Date()
        });

        this.vehicles.delete(licensePlate);
        console.log(`❌ Đã hủy đăng ký: ${licensePlate}`);
    }

    /**
     * Tìm kiếm phương tiện theo biển số
     * @param {string} licensePlate - Biển số xe
     * @returns {Object} Thông tin đăng ký
     */
    findVehicle(licensePlate) {
        const registration = this.vehicles.get(licensePlate);
        if (!registration) {
            throw new Error(`Không tìm thấy phương tiện: ${licensePlate}`);
        }
        return registration;
    }

    /**
     * Lấy danh sách tất cả phương tiện
     * @returns {Array} Danh sách biển số
     */
    getAllLicensePlates() {
        return Array.from(this.vehicles.keys());
    }

    /**
     * Lấy danh sách phương tiện theo loại
     * @param {string} type - Loại phương tiện
     * @returns {Array}
     */
    getVehiclesByType(type) {
        const result = [];
        this.vehicles.forEach((registration, licensePlate) => {
            if (registration.vehicle.getType().toLowerCase() === type.toLowerCase()) {
                result.push({
                    licensePlate: licensePlate,
                    vehicle: registration.vehicle.getInfo()
                });
            }
        });
        return result;
    }

    /**
     * Lấy thống kê
     * @returns {Object} Thông tin thống kê
     */
    getStatistics() {
        const stats = {
            totalRegistered: this.totalRegistered,
            activeVehicles: this.vehicles.size,
            byType: {}
        };

        this.vehicles.forEach((registration) => {
            const type = registration.vehicle.getType();
            stats.byType[type] = (stats.byType[type] || 0) + 1;
        });

        return stats;
    }

    /**
     * Lấy lịch sử đăng ký
     * @param {number} limit - Số lượng bản ghi
     * @returns {Array}
     */
    getHistory(limit = 10) {
        return this.registrationHistory.slice(-limit);
    }
}

module.exports = VehicleRegistry;
