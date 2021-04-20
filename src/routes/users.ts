import Router from "koa-router";
import UserController from "../controllers/userController";

const router = new Router();

router.prefix(`${process.env.BASE_API_PREFIX}/users`);

router.get("/", UserController.listUsers);

router.post('/', UserController.addUser);

router.get("/:id", UserController.showUserDetail);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

export default router;
