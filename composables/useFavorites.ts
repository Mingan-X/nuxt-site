import { favoriteWebsites, favoriteCategories, type FavoriteWebsite, type FavoriteCategory } from '~/config/favorites';

export const useFavorites = () => {
  // 获取所有收藏网站
  const getAllFavorites = (): FavoriteWebsite[] => {
    return favoriteWebsites;
  };

  // 获取所有分类
  const getAllCategories = (): FavoriteCategory[] => {
    return favoriteCategories;
  };

  // 根据分类获取网站
  const getFavoritesByCategory = (categoryId: string): FavoriteWebsite[] => {
    return favoriteWebsites.filter(site => site.category === categoryId);
  };

  // 获取精选网站
  const getFeaturedFavorites = (): FavoriteWebsite[] => {
    return favoriteWebsites.filter(site => site.featured === true);
  };

  // 根据标签搜索
  const searchFavoritesByTag = (tag: string): FavoriteWebsite[] => {
    return favoriteWebsites.filter(site => 
      site.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
  };

  // 搜索收藏网站
  const searchFavorites = (query: string): FavoriteWebsite[] => {
    const lowerQuery = query.toLowerCase();
    return favoriteWebsites.filter(site => 
      site.title.toLowerCase().includes(lowerQuery) ||
      site.description.toLowerCase().includes(lowerQuery) ||
      site.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  // 根据ID获取网站
  const getFavoriteById = (id: string): FavoriteWebsite | undefined => {
    return favoriteWebsites.find(site => site.id === id);
  };

  // 根据ID获取分类
  const getCategoryById = (id: string): FavoriteCategory | undefined => {
    return favoriteCategories.find(category => category.id === id);
  };

  // 获取分类统计
  const getCategoryStats = () => {
    return favoriteCategories.map(category => ({
      ...category,
      count: getFavoritesByCategory(category.id).length
    }));
  };

  // 获取最近添加的网站
  const getRecentFavorites = (limit: number = 6): FavoriteWebsite[] => {
    return favoriteWebsites
      .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
      .slice(0, limit);
  };

  // 获取所有标签
  const getAllTags = (): string[] => {
    const allTags = favoriteWebsites.flatMap(site => site.tags);
    return [...new Set(allTags)].sort();
  };

  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 获取网站图标URL，如果没有则使用默认图标
  const getWebsiteIcon = (site: FavoriteWebsite): string => {
    if (site.icon) {
      return site.icon;
    }
    // 使用 Google 的 favicon 服务作为备选
    try {
      const domain = new URL(site.url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return '/favicon.ico'; // 默认图标
    }
  };

  return {
    getAllFavorites,
    getAllCategories,
    getFavoritesByCategory,
    getFeaturedFavorites,
    searchFavoritesByTag,
    searchFavorites,
    getFavoriteById,
    getCategoryById,
    getCategoryStats,
    getRecentFavorites,
    getAllTags,
    formatDate,
    getWebsiteIcon
  };
};
