export const metadata = {
  title: "Nicholas Egner",
  description: "Nicholas Egner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
