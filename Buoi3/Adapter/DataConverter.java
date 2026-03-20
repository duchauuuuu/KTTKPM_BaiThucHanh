package Adapter;

public class DataConverter {

    public static String xmlToJson(String xml) {
        StringBuilder json = new StringBuilder("{\n");
        String[] lines = xml.split("\n");
        boolean first = true;

        for (String line : lines) {
            line = line.trim();
            java.util.regex.Matcher m = java.util.regex.Pattern
                .compile("<(\\w+)>([^<]*)</\\1>")
                .matcher(line);

            while (m.find()) {
                if (!first) json.append(",\n");
                json.append("  \"").append(m.group(1))
                    .append("\": \"").append(m.group(2)).append("\"");
                first = false;
            }
        }

        json.append("\n}");
        return json.toString();
    }

    public static String jsonToXml(String json) {
        StringBuilder xml = new StringBuilder("<request>\n");

        String body = json.replaceAll("[{}]", "").trim();
        String[] pairs = body.split(",");

        for (String pair : pairs) {
            pair = pair.trim();
            java.util.regex.Matcher m = java.util.regex.Pattern
                .compile("\"(\\w+)\"\\s*:\\s*\"([^\"]*)\"")
                .matcher(pair);

            if (m.find()) {
                xml.append("  <").append(m.group(1)).append(">")
                   .append(m.group(2))
                   .append("</").append(m.group(1)).append(">\n");
            }
        }

        xml.append("</request>");
        return xml.toString();
    }
}
