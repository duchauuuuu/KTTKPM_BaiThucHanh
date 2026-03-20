package Composite;

public class Main {

    public static void main(String[] args) {

        Directory root = new Directory("root");

        File readme = new File("readme.txt", 1024, "txt");

        Directory src = new Directory("src");
        File mainJava  = new File("Main.java",  3500, "java");
        File utilsJava = new File("Utils.java", 2800, "java");

        Directory model = new Directory("model");
        File userJava    = new File("User.java",    4200, "java");
        File productJava = new File("Product.java", 3900, "java");

        model.add(userJava);
        model.add(productJava);

        src.add(mainJava);
        src.add(utilsJava);
        src.add(model);

        Directory resources = new Directory("resources");
        File configJson = new File("config.json", 512, "json");

        Directory images = new Directory("images");
        File logoPng   = new File("logo.png",   102400, "png");
        File bannerJpg = new File("banner.jpg", 204800, "jpg");

        images.add(logoPng);
        images.add(bannerJpg);

        resources.add(configJson);
        resources.add(images);

        root.add(readme);
        root.add(src);
        root.add(resources);

        separator("HIỂN THỊ TOÀN BỘ CÂY THƯ MỤC");
        root.display();

        separator("THỐNG KÊ KÍCH THƯỚC");
        System.out.printf("Kích thước thư mục %-12s : %,d bytes%n", "root",      root.getSize());
        System.out.printf("Kích thước thư mục %-12s : %,d bytes%n", "src",       src.getSize());
        System.out.printf("Kích thước thư mục %-12s : %,d bytes%n", "model",     model.getSize());
        System.out.printf("Kích thước thư mục %-12s : %,d bytes%n", "resources", resources.getSize());
        System.out.printf("Kích thước thư mục %-12s : %,d bytes%n", "images",    images.getSize());

        separator("TÌM KIẾM TRONG CÂY");
        searchAndPrint(root, "Utils.java");
        searchAndPrint(root, "model");
        searchAndPrint(root, "notExist.txt");

        separator("XÓA \"Utils.java\" KHỎI src");
        src.remove(utilsJava);
        src.display();

        separator("THÊM \"README.md\" VÀO src");
        File newReadme = new File("README.md", 768, "md");
        src.add(newReadme);
        src.display();
    }

    private static void searchAndPrint(Directory root, String name) {
        FileSystemComponent result = root.search(name);
        if (result != null) {
            System.out.printf("Tìm thấy \"%s\" — kiểu: %s, kích thước: %,d bytes%n",
                name,
                result instanceof Directory ? "Thư mục" : "Tập tin",
                result.getSize()
            );
        } else {
            System.out.printf("Không tìm thấy \"%s\" trong cây.%n", name);
        }
    }

    private static void separator(String title) {
        System.out.println();
        System.out.println("══════════════════════════════════════");
        System.out.println("  " + title);
        System.out.println("══════════════════════════════════════");
    }
}
