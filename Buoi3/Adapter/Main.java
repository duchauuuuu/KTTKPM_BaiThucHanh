package Adapter;

public class Main {

    public static void main(String[] args) {

        XmlSystem xmlSystem = new XmlSystem();

        separator("KỊCH BẢN 1: JSON → XmlToJsonAdapter → XML → XmlSystem → JSON");

        String jsonRequest = "{\n" +
            "  \"name\": \"Nguyen Van A\",\n" +
            "  \"email\": \"nguyenvana@example.com\",\n" +
            "  \"age\": \"28\"\n" +
            "}";

        JsonService adapter1 = new XmlToJsonAdapter(xmlSystem);
        System.out.println("Client gửi JSON tới dịch vụ web:");
        System.out.println(jsonRequest);
        System.out.println("\n-- Adapter đang xử lý --");
        String jsonResponse1 = adapter1.processJson(jsonRequest);
        System.out.println("\nClient nhận lại JSON kết quả:");
        System.out.println(jsonResponse1);

        separator("KỊCH BẢN 2: JSON → JsonToXmlAdapter → XML → XmlSystem → JSON");

        String orderJson = "{\n" +
            "  \"orderId\": \"ORD-2024-001\",\n" +
            "  \"product\": \"Laptop\",\n" +
            "  \"quantity\": \"2\",\n" +
            "  \"price\": \"25000000\"\n" +
            "}";

        JsonToXmlAdapter adapter2 = new JsonToXmlAdapter(xmlSystem);
        System.out.println("Hệ thống ngoài gửi JSON:");
        System.out.println(orderJson);
        System.out.println("\n-- Adapter đang xử lý --");
        String jsonResponse2 = adapter2.convertAndProcess(orderJson);
        System.out.println("\nKết quả trả về dưới dạng JSON:");
        System.out.println(jsonResponse2);

        separator("KỊCH BẢN 3: Gọi trực tiếp XmlSystem (không dùng Adapter)");

        String rawXml = "<request>\n" +
            "  <username>admin</username>\n" +
            "  <action>login</action>\n" +
            "</request>";

        System.out.println("Gửi trực tiếp XML:");
        System.out.println(rawXml);
        System.out.println("\n-- XmlSystem xử lý --");
        String xmlResult = xmlSystem.processXml(rawXml);
        System.out.println("\nKết quả XML thuần:");
        System.out.println(xmlResult);

        separator("TỔNG KẾT");
        System.out.println("JsonService (Target)  : dịch vụ web chỉ nói JSON");
        System.out.println("XmlSystem  (Adaptee)  : hệ thống cũ chỉ nói XML");
        System.out.println("XmlToJsonAdapter      : cầu nối JSON → XML → JSON");
        System.out.println("JsonToXmlAdapter      : cầu nối JSON → XML → JSON (chiều ngược)");
        System.out.println("DataConverter         : bộ chuyển đổi định dạng độc lập");
    }

    private static void separator(String title) {
        System.out.println();
        System.out.println("══════════════════════════════════════════════════════");
        System.out.println("  " + title);
        System.out.println("══════════════════════════════════════════════════════");
    }
}
