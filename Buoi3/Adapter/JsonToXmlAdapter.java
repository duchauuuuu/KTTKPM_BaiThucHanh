package Adapter;

public class JsonToXmlAdapter {

    private XmlSystem xmlSystem;

    public JsonToXmlAdapter(XmlSystem xmlSystem) {
        this.xmlSystem = xmlSystem;
    }

    public String convertAndProcess(String jsonInput) {
        System.out.println("  [JsonToXmlAdapter] Nhận JSON đầu vào:");
        System.out.println("  " + jsonInput);

        String xmlInput = DataConverter.jsonToXml(jsonInput);
        System.out.println("\n  [JsonToXmlAdapter] JSON → XML:");
        System.out.println("  " + xmlInput);

        System.out.println("\n  [JsonToXmlAdapter] Chuyển sang XmlSystem...");
        String xmlOutput = xmlSystem.processXml(xmlInput);

        String jsonOutput = DataConverter.xmlToJson(xmlOutput);
        System.out.println("\n  [JsonToXmlAdapter] XML kết quả → JSON:");
        System.out.println("  " + jsonOutput);

        return jsonOutput;
    }
}
