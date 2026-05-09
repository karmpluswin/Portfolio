import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[740px] flex-col px-4 py-5 sm:px-5 sm:py-7">
      <Header />
      <div className="my-4 h-px w-full bg-[var(--line)]" />
      <Timeline />
      <Footer />
    </main>
  );
}
