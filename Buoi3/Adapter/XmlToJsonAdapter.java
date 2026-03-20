package Adapter;

public class XmlToJsonAdapter implements JsonService {

    private XmlSystem xmlSystem;

    public XmlToJsonAdapter(XmlSystem xmlSystem) {
        this.xmlSystem = xmlSystem;
    }

    @Override
    public String processJson(String jsonData) {
        System.out.println("  [XmlToJsonAdapter] Nhận JSON từ client:");
        System.out.println("  " + jsonData);

        String xmlData = DataConverter.jsonToXml(jsonData);
        System.out.println("\n  [XmlToJsonAdapter] Đã chuyển sang XML:");
        System.out.println("  " + xmlData);

        System.out.println("\n  [XmlToJsonAdapter] Chuyển sang XmlSystem xử lý...");
        String xmlResult = xmlSystem.processXml(xmlData);

        String jsonResult = DataConverter.xmlToJson(xmlResult);
        System.out.println("\n  [XmlToJsonAdapter] Đã chuyển kết quả về JSON:");
        System.out.println("  " + jsonResult);

        return jsonResult;
    }
}
