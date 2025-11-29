// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string;
      avatar?: string;
    };
  }

  interface User {
    username?: string;
    avatar?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    username?: string;
    avatar?: string;
  }
}