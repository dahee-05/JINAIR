import express from "express";
import * as controller from "../controller/adminController.js";

const router = express.Router();

router
  .get("/flight", controller.getFlightList)
  .post("/login", controller.getAdminLogin)
  .post("/Fnum", controller.getFnum)
  .post("/flightRegister", controller.setFlightRegister)
  .post("/deleteFlightList", controller.deleteFlight)
  .get("/noticeList", controller.getNoticeList)
  .post("/notice/delete", controller.deleteNoticeList)
  .post("/noticeSearch", controller.getSearchNoticeList)
  .post("/noticeRegister", controller.setNoticeRegister)
  .post("/noticeInfo", controller.getNoticeInfo)
  .post("/noticeUpdate", controller.updateNoticeInfo);

export default router;
