import { getSessionByToken } from "../services/session.service";

export const authMiddleware = async ({ cookie, set }: any) => {
    const token = cookie?.session?.value

    if (!token) {
        throw createError({ 
            statusCode: 401, 
            statusMessage: 'Unauthorized, No token' 
        });
    }

    const session = await getSessionByToken(token);

    if (!session) {
        throw createError({ 
            statusCode: 401, 
            statusMessage: 
            'Unauthorized, No token'
         });
    }

    return { user: session.user };
};
