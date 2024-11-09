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
    const queryParams = new URLSearchParams({
      page,
      perpage: perPage,
      ...(category && category !== '전체' && { category })
    });

    const response = await fetch(`${articleListUrl}?${queryParams}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.articlelist) {
      throw new Error('Invalid response format: articlelist is missing');
    }

    return data.articlelist.map((article) => ({
      ...article,
      Tags: Array.isArray(article.Tags) 
        ? article.Tags 
        : typeof article.Tags === "string" 
          ? article.Tags.split(",").filter(Boolean)
          : [],
      Thumbnail: article.Thumbnail
        ? article.Thumbnail.startsWith('http') 
          ? article.Thumbnail
          : `${contentsBaseUrl}${article.Thumbnail}`
        : null,
      Description: article.Description || '',
      View_count: parseInt(article.View_count, 10) || 0,
      Created_at: new Date(article.Created_at).toISOString()
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

export const getArticleComments = async (articleId) => {
  try {
    const response = await fetch(`${articleDetailUrl}/${articleId}/comments`);
    if (!response.ok) {
      throw new Error(
        `댓글을 불러오는 데 실패했습니다: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data.comments || [];
  } catch (error) {
    console.error("댓글을 불러오는 중 오류 발생:", error);
    throw error;
  }
};

export const postArticleComment = async (
  articleId,
  nickname,
  password,
  content
) => {
  try {
    const response = await fetch(`${articleDetailUrl}/${articleId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname,
        password,
        content,
      }),
    });
    if (!response.ok) {
      throw new Error(`댓글 작성에 실패했습니다: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("댓글 작성 중 오류 발생:", error);
    throw error;
  }
};

export const updateArticleComment = async (
  articleId,
  commentId,
  password,
  content
) => {
  try {
    const response = await fetch(`${articleDetailUrl}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_id: commentId,
        password,
        content,
      }),
    });
    if (!response.ok) {
      throw new Error(`댓글 수정에 실패했습니다: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("댓글 수정 중 오류 발생:", error);
    throw error;
  }
};

export const deleteArticleComment = async (commentId, password) => {
  try {
    const response = await fetch(`${articleDetailUrl}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error(`댓글 삭제에 실패했습니다: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생:", error);
    throw error;
  }
};
