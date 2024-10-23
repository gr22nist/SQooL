const articleListUrl = process.env.NEXT_PUBLIC_API_ARTICLE_LIST_URL;
const articleDetailUrl = process.env.NEXT_PUBLIC_API_ARTICLE_DETAIL_URL;
const contentsBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const adjustImagePaths = (htmlContent) => {
  const div = document.createElement("div");
  div.innerHTML = htmlContent;
  const images = div.getElementsByTagName("img");

  for (let img of images) {
    const originalSrc = img.getAttribute("src");
    if (originalSrc && originalSrc.startsWith("/static/Uploads")) {
      const newSrc = `${contentsBaseUrl}${originalSrc}`;
      img.setAttribute("src", newSrc);
    }
  }

  return div.innerHTML;
};

export const getArticleList = async (page, perPage, category) => {
  try {
    const response = await fetch(
      `${articleListUrl}?page=${page}&perpage=${perPage}&category=${category}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    const data = await response.json();
    const articleList = data.articlelist || [];
    return articleList.map((article) => ({
      ...article,
      Tags: typeof article.Tags === "string" ? article.Tags.split(",") : [],
      Thumbnail: article.Thumbnail
        ? `${contentsBaseUrl}${article.Thumbnail}`
        : null,
      Description: article.Description,
    }));
  } catch (error) {
    console.error("Error fetching article list:", error);
    throw error;
  }
};

export const getArticleDetail = async (articleId) => {
  try {
    const response = await fetch(`${articleDetailUrl}/${articleId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch article detail: ${response.statusText}`);
    }
    const data = await response.json();
    const articleInfo = data.article || {};

    return {
      ...articleInfo,
      Tags:
        typeof articleInfo.Tags === "string" ? articleInfo.Tags.split(",") : [],
      View_count: parseInt(articleInfo.View_count, 10) || 0,
      Created_at: new Date(articleInfo.Created_at),
      Content: adjustImagePaths(articleInfo.Content),
    };
  } catch (error) {
    console.error("Error fetching article detail:", error);
    throw error;
  }
};
