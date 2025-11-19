export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  message?: string;
} {
  if (password.length < 8) {
    return { valid: false, message: "password must be at least 8 characters" };
  }
  return { valid: true };
}

export function validateUsername(username: string): {
  valid: boolean;
  message?: string;
} {
  if (username.length < 3) {
    return { valid: false, message: "username must be at least 3 characters" };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      valid: false,
      message: "username can only contain letters, numbers, and underscores",
    };
  }
  return { valid: true };
}
