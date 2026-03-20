package Composite;

import java.util.ArrayList;
import java.util.List;

public class Directory extends FileSystemComponent {

    private List<FileSystemComponent> children = new ArrayList<>();

    public Directory(String name) {
        super(name);
    }

    @Override
    public void add(FileSystemComponent component) {
        component.setDepth(this.depth + 1);
        children.add(component);
    }

    @Override
    public void setDepth(int depth) {
        this.depth = depth;
        for (FileSystemComponent child : children) {
            child.setDepth(depth + 1);
        }
    }

    @Override
    public void remove(FileSystemComponent component) {
        children.remove(component);
    }

    @Override
    public long getSize() {
        long total = 0;
        for (FileSystemComponent child : children) {
            total += child.getSize();
        }
        return total;
    }

    @Override
    public void display() {
        String indent = getIndent();
        long totalSize = getSize();
        String sizeStr = formatSize(totalSize);

        if (depth == 0) {
            System.out.printf("📁 %s  [%d mục, %s]%n", name, children.size(), sizeStr);
        } else {
            System.out.printf("%s├── 📁 %s  [%d mục, %s]%n",
                indent, name, children.size(), sizeStr);
        }

        for (int i = 0; i < children.size(); i++) {
            children.get(i).display();
        }
    }

    @Override
    public FileSystemComponent search(String targetName) {
        if (name.equalsIgnoreCase(targetName)) return this;
        for (FileSystemComponent child : children) {
            FileSystemComponent result = child.search(targetName);
            if (result != null) return result;
        }
        return null;
    }

    public List<FileSystemComponent> getChildren() {
        return children;
    }

    private String formatSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return String.format("%.1f KB", bytes / 1024.0);
        return String.format("%.1f MB", bytes / (1024.0 * 1024));
    }
}
