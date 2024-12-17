import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Providers } from '@/store/provider';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kelibe",
  description: "Date to Marry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <AuthProvider>
              {children}
            </AuthProvider>
          </GoogleOAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
