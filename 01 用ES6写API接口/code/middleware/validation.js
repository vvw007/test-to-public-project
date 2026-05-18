import { error } from '../utils/response.js';

/**
 * 验证请求体中的必填字段
 * @param {string[]} fields - 必填字段列表
 */
export function validateRequired(fields = []) {
  return (req, res, next) => {
    const missingFields = [];

    for (const field of fields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return error(res, `缺少必填字段: ${missingFields.join(', ')}`, 400);
    }

    next();
  };
}

/**
 * 验证用户 ID 是否为有效数字
 */
export function validateUserId(req, res, next) {
  const { id } = req.params;
  const userId = parseInt(id);

  if (isNaN(userId) || userId <= 0) {
    return error(res, '无效的用户 ID', 400);
  }

  req.params.id = userId;
  next();
}

/**
 * 验证分页参数
 */
export function validatePagination(req, res, next) {
  let { page = 1, pageSize = 10 } = req.query;

  page = parseInt(page);
  pageSize = parseInt(pageSize);

  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
    pageSize = 10;
  }

  req.query.page = page;
  req.query.pageSize = pageSize;
  next();
}