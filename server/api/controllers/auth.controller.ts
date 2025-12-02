import { Elysia, t } from "elysia";
import { getUserById, loginUser, registerUser } from "../services/user.service";
import { errorResponse, successResponse } from "../utils/response.util";
import { loginRequest, registerRequest } from "../validators/auth.validator";
import { createSession, deleteSession, getSessionByToken } from "../services/session.service";

export const authController = (app: Elysia) => {
  return app.group("/auth", (app) =>
    app
    .post("/login", async ({ body, cookie: { session }, set }) => {
        try {
             const user = await loginUser(body.email, body.password);

            if (!user) {
                 return errorResponse("Invalid credentials", (set.status = 401));
            }

            const s = await createSession(user.id);

            session.value = s.token;
            session.httpOnly = true;
            session.maxAge = 3 * 24 * 60 * 60;
            session.sameSite = "lax";

            console.log("session token:", session.value);
            return successResponse(user);
        } catch (error) {
            set.status = 400;
            return errorResponse(
                "failed to fetch user",
                400, error
            );
        }
        },{
            body: loginRequest,
        })
    .post("/register", async ({ body, set }) => {
        try {
            const user = await registerUser(body.email, body.password);
            return successResponse(user);
        } catch (error) {
            set.status = 400;
            return errorResponse(
                "Registration failed", 
                400, 
                error
            )
          }
        }, {
          body: registerRequest,
        })
    .delete("/logout", async ({ cookie: { session }, set }) => {
        try {
            const token = (session.value as string) || undefined;

            if (token == undefined) {
                console.log("token undefined: %d", token);
                return errorResponse("Token is undefined", (set.status = 401));
            }

            if (token) {
                await deleteSession(token);
            }

            session.remove();

            return successResponse();
        } catch (error) {
             set.status = 400;
            return errorResponse("failed to logout", 400, error);
        }
    })
    .get("/me", async ({cookie: {session}, set}) => {
        try {
            const token = session.value as string

            if (!token) {
                set.status = 401
                console.log('token is undefined', 401);

            }

            const sessionData = await getSessionByToken(token)
            if (!sessionData) {
                set.status = 401;
                return errorResponse("invalid or expired session");
            }

            const me = await getUserById(sessionData.userId);
            if (!me) {
            set.status = 404;
            return errorResponse("user not found");
            }

            return {
                success: true,
                user: me,
            };

        } catch (error) {
            set.status = 400;
            return errorResponse("failed to fetch user", 400, error);
        }
      }) 
  );
};