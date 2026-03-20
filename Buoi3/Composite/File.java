package Composite;

public class File extends FileSystemComponent {

    private long size;
    private String fileType;

    public File(String name, long size, String fileType) {
        super(name);
        this.size = size;
        this.fileType = fileType;
    }

    @Override
    public long getSize() {
        return size;
    }

    @Override
    public void display() {
        System.out.printf("%s├── 📄 %s  [%s, %s]%n",
            getIndent(),
            name,
            fileType.toUpperCase(),
            formatSize(size)
        );
    }

    private String formatSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return String.format("%.1f KB", bytes / 1024.0);
        return String.format("%.1f MB", bytes / (1024.0 * 1024));
    }
}
