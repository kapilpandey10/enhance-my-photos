import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import BeforeAfter from "@/components/site/BeforeAfter";
import Features from "@/components/site/Features";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <BeforeAfter />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
