import prisma from "~~/server/db/prisma";
import { hashPassword, verifyPassword } from "../utils/password";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validation";

export async function registerUser(
  email: string,
  username: string,
  password: string
) {
  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }

  const usernameValidation = validateUsername(username);
  if (!usernameValidation.valid) {
    throw new Error(usernameValidation.message);
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    throw new Error(passwordValidation.message);
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("email already registered");
    }
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: String(hashedPassword),
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
    },
  })

  return user;
}

export async function loginUser(email: string, password: string) {
   const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
  };
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
    },
  });

  return user;
}