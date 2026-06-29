//统一导出接口
import { recommendMusic, newMusic } from "./Home.js";
import { hotSearch, searchResult } from "./Search.js";
import { getSongById, getLyricById } from "./play.js";

export const recommendMusicApi = recommendMusic; // 请求推荐歌单的方法导出
export const newMusicAPI = newMusic; // 首页 - 最新音乐
export const hotSearchAPI = hotSearch; // 搜索 - 热点搜索关键词
export const searchResultAPI = searchResult; //搜索结果
export const getSongByIdAPI = getSongById; //获取歌曲
export const getLyricByIdAPI = getLyricById; //获取歌词
