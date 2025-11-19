import { loginUser } from "../../services/user.service";
import { createSession } from "../../services/session.service";

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "missing required fields",
      });
    }

    const user = await loginUser(email, password);

    const session = await createSession(user.id);

    setCookie(event, "auth_token", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60,
      path: "/",
    });

    return {
      user: session.user,
      message: "login successful",
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "login failed",
    });
  }
});
