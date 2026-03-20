package Composite;

public abstract class FileSystemComponent {

    protected String name;
    protected int depth;

    public FileSystemComponent(String name) {
        this.name = name;
        this.depth = 0;
    }

    public String getName() {
        return name;
    }

    public void setDepth(int depth) {
        this.depth = depth;
    }

    protected String getIndent() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            sb.append("│   ");
        }
        return sb.toString();
    }

    public abstract void display();

    public abstract long getSize();

    public void add(FileSystemComponent component) {
        throw new UnsupportedOperationException(
            "\"" + name + "\" không hỗ trợ thêm phần tử con."
        );
    }

    public void remove(FileSystemComponent component) {
        throw new UnsupportedOperationException(
            "\"" + name + "\" không hỗ trợ xóa phần tử con."
        );
    }

    public FileSystemComponent search(String targetName) {
        return name.equalsIgnoreCase(targetName) ? this : null;
    }
}
