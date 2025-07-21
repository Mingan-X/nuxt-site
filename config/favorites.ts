export interface FavoriteWebsite {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  category: string;
  tags: string[];
  addedDate: string;
  featured?: boolean;
}

export interface FavoriteCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const favoriteCategories: FavoriteCategory[] = [
  {
    id: "design",
    name: "设计工具",
    description: "UI/UX设计、图标、配色等设计相关工具",
    icon: "ColorPaletteOutline",
    color: "purple"
  },
  {
    id: "development",
    name: "开发工具",
    description: "编程、开发、部署相关的工具和资源",
    icon: "CodeSlashOutline",
    color: "blue"
  },
  {
    id: "learning",
    name: "学习资源",
    description: "技术文档、教程、课程等学习资源",
    icon: "BookOutline",
    color: "green"
  },
  {
    id: "productivity",
    name: "效率工具",
    description: "提高工作效率的工具和应用",
    icon: "FlashOutline",
    color: "orange"
  },
  {
    id: "inspiration",
    name: "灵感创意",
    description: "设计灵感、创意网站、作品展示",
    icon: "BulbOutline",
    color: "pink"
  },
  {
    id: "other",
    name: "其他",
    description: "其他有趣的网站和工具",
    icon: "EllipsisHorizontalOutline",
    color: "gray"
  }
];

export const favoriteWebsites: FavoriteWebsite[] = [
  // 设计工具
  {
    id: "figma",
    title: "Figma",
    description: "协作式界面设计工具，支持实时协作和原型制作",
    url: "https://www.figma.com",
    icon: "https://www.figma.com/favicon.ico",
    category: "design",
    tags: ["UI设计", "协作", "原型"],
    addedDate: "2024-01-15",
    featured: true
  },
  {
    id: "dribbble",
    title: "Dribbble",
    description: "设计师作品展示和灵感分享平台",
    url: "https://dribbble.com",
    icon: "https://dribbble.com/favicon.ico",
    category: "inspiration",
    tags: ["设计灵感", "作品展示", "UI"],
    addedDate: "2024-01-10",
    featured: true
  },
  {
    id: "coolors",
    title: "Coolors",
    description: "快速生成配色方案的在线工具",
    url: "https://coolors.co",
    icon: "https://coolors.co/favicon.ico",
    category: "design",
    tags: ["配色", "调色板", "颜色"],
    addedDate: "2024-01-12"
  },
  
  // 开发工具
  {
    id: "github",
    title: "GitHub",
    description: "全球最大的代码托管平台",
    url: "https://github.com",
    icon: "https://github.com/favicon.ico",
    category: "development",
    tags: ["代码托管", "版本控制", "开源"],
    addedDate: "2024-01-01",
    featured: true
  },
  {
    id: "vercel",
    title: "Vercel",
    description: "前端应用部署平台，支持自动部署和CDN加速",
    url: "https://vercel.com",
    icon: "https://vercel.com/favicon.ico",
    category: "development",
    tags: ["部署", "前端", "CDN"],
    addedDate: "2024-01-08"
  },
  {
    id: "vscode",
    title: "Visual Studio Code",
    description: "微软开发的免费代码编辑器",
    url: "https://code.visualstudio.com",
    icon: "https://code.visualstudio.com/favicon.ico",
    category: "development",
    tags: ["编辑器", "IDE", "开发"],
    addedDate: "2024-01-05"
  },

  // 学习资源
  {
    id: "mdn",
    title: "MDN Web Docs",
    description: "Web开发技术文档和学习资源",
    url: "https://developer.mozilla.org",
    icon: "https://developer.mozilla.org/favicon.ico",
    category: "learning",
    tags: ["文档", "Web开发", "JavaScript"],
    addedDate: "2024-01-03",
    featured: true
  },
  {
    id: "vue-docs",
    title: "Vue.js 官方文档",
    description: "Vue.js 框架的官方文档和指南",
    url: "https://vuejs.org",
    icon: "https://vuejs.org/favicon.ico",
    category: "learning",
    tags: ["Vue", "框架", "文档"],
    addedDate: "2024-01-06"
  },
  {
    id: "nuxt-docs",
    title: "Nuxt.js 文档",
    description: "基于Vue.js的全栈框架文档",
    url: "https://nuxt.com",
    icon: "https://nuxt.com/favicon.ico",
    category: "learning",
    tags: ["Nuxt", "Vue", "全栈"],
    addedDate: "2024-01-07"
  },

  // 效率工具
  {
    id: "notion",
    title: "Notion",
    description: "集笔记、数据库、项目管理于一体的工作空间",
    url: "https://www.notion.so",
    icon: "https://www.notion.so/favicon.ico",
    category: "productivity",
    tags: ["笔记", "项目管理", "协作"],
    addedDate: "2024-01-09"
  },
  {
    id: "raycast",
    title: "Raycast",
    description: "Mac上的快速启动器和生产力工具",
    url: "https://www.raycast.com",
    icon: "https://www.raycast.com/favicon.ico",
    category: "productivity",
    tags: ["启动器", "Mac", "效率"],
    addedDate: "2024-01-11"
  },

  // 灵感创意
  {
    id: "awwwards",
    title: "Awwwards",
    description: "优秀网站设计作品展示和评选平台",
    url: "https://www.awwwards.com",
    icon: "https://www.awwwards.com/favicon.ico",
    category: "inspiration",
    tags: ["网站设计", "灵感", "获奖作品"],
    addedDate: "2024-01-13"
  },
  {
    id: "behance",
    title: "Behance",
    description: "Adobe旗下的创意作品展示平台",
    url: "https://www.behance.net",
    icon: "https://www.behance.net/favicon.ico",
    category: "inspiration",
    tags: ["创意", "作品集", "设计"],
    addedDate: "2024-01-14"
  }
];
