package Adapter;

public class XmlSystem {

    public String processXml(String xmlData) {
        System.out.println("  [XmlSystem] Đang xử lý XML...");
        System.out.println("  [XmlSystem] Input: " + xmlData);

        String result = xmlData.replace("</request>",
            "  <status>processed</status>\n</request>");

        System.out.println("  [XmlSystem] Output: " + result);
        return result;
    }
}
