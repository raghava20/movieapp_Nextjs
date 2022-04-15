import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import "src/styles/donate.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
