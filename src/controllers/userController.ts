import { Context } from "koa";
import { User } from "../models/User";
import { getManager } from "typeorm";

class UserController {
  public static async listUsers(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    ctx.status = 200;
    ctx.body = users;
  }

  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(+ctx.params.id);

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 404;
    }
  }

  public static async addUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = new User();
    const data = ctx.request.body || {};
    user.age = data.age;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    const res = await userRepository.save(user);
    if (res) {
      ctx.staus = 201;
      ctx.body = res;
    } else {
      ctx.status = 500;
    }
  }

  public static async updateUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    await userRepository.update(+ctx.params.id, ctx.request.body);
    const updatedUser = await userRepository.findOne(+ctx.params.id);

    if (updatedUser) {
      ctx.status = 200;
      ctx.body = updatedUser;
    } else {
      ctx.status = 404;
    }
  }

  public static async deleteUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    await userRepository.delete(+ctx.params.id);

    ctx.status = 204;
  }
}

export default UserController;
