import express from 'express'
// 1.使用默认导入语法,导入路由对象
import { getAllUser } from '../controller/user_ctrl.js'

const router = new express.Router()
// 2.使用路由对象,挂载路由
router.get('/user', getAllUser)
// 3.导出路由对象
export default router
