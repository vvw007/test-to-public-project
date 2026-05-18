/**
 * 统一成功响应
 */
export function success(res, data = null, message = '操作成功', statusCode = 200) {
  return res.status(statusCode).json({
    status: 0,
    message,
    data,
  });
}

/**
 * 统一错误响应
 */
export function error(res, message = '操作失败', statusCode = 400, errors = null) {
  return res.status(statusCode).json({
    status: 1,
    message,
    errors,
  });
}

/**
 * 统一分页响应
 */
export function paginate(res, data, total, page = 1, pageSize = 10) {
  return res.status(200).json({
    status: 0,
    message: '获取成功',
    data,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}