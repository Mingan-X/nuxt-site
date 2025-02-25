export function buildFullToc(markdownNodes: any[]) {
  const toc: any = [];
  const stack: any = [];

  markdownNodes.forEach((node) => {
    if (node[0].startsWith("h")) {
      const depth = parseInt(node[0].substring(1));
      const entry = {
        id: node[1].id,
        depth,
        text: node[2],
        children: [],
      };

      // 找到最近的父级
      while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
        stack.pop();
      }

      // 添加到父级或根
      if (stack.length === 0) {
        toc.push(entry);
      } else {
        if (!stack[stack.length - 1].children) {
          stack[stack.length - 1].children = [];
        }
        stack[stack.length - 1].children.push(entry);
      }

      stack.push(entry);
    }
  });

  return toc;
}
