import request from "@/utils/request.js";

// 播放页 - 获取歌曲详情
export const getSongById = (id) =>
  request({
    url: `/song/detail?ids=${id}`, // ✅ 改为反引号
    method: "GET",
  });

// 播放页 - 获取歌词
export const getLyricById = (id) =>
  request({
    url: `/lyric?id=${id}`, // ✅ 改为反引号
    method: "GET",
  });
