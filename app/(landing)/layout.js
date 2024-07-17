import { NavBar } from "./_components/navbar";

export default function LandingLayout({ children }) {
  return (
    <section>
      <NavBar />
      <main>
      {children}
      </main>
    </section>
  );
}
