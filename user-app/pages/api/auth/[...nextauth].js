import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(`http://localhost:5000/api/login`, {
            email: credentials.email,
            password: credentials.password,
          });
          const user = response.data;
          if (user && user.token) {
            return {
              id_user: user.id_user,
              role: user.role,
              foto:user.foto,
              nama_depan:user.nama_depan,
              nama_belakang:user.nama_belakang,
              accessToken: user.token,
            };
          } else {
            console.error('Access token is missing in user data');
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.foto = user.foto;
        token.id_user = user.id_user;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.foto = token.foto;
      session.user.id_user = token.id_user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
});