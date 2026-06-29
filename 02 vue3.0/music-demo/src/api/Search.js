import request from "@/utils/request.js";

//搜索推荐
export const hotSearch = (params) =>
  request({
    url: "/search/hot",
    params,
    // 将来外面可能传入params的值 {limit: 20}
  });

//搜索结果
export const searchResult = (params) =>
  request({
    url: "/search",
    params,
    // 将来外面可能传入params的值 {limit: 30}
  });
