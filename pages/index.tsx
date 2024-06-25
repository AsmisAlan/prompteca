import Image from "next/image";
import { Inter } from "next/font/google";
import PromptEngineeringForm from './PromptEngineeringForm'
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import SparklesText from "@/components/magicui/sparkles-text";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-10 ${inter.className}`}
    >
      <div className="w-full flex items-center flex-col">
        <span className="text-center flex flex-col items-center mb-2">
          <SparklesText text="Prompteca" className="text-5xl font-bold text-center" />
          <small>Write Once, Execute Everywhere</small>
        </span>
        <PromptEngineeringForm />
        <footer className="text-center mt-10 fixed bottom-0 left-0 right-0">
          Created by Alan Asmis
        </footer>
      </div>
      <DotPattern
        className={cn(
          "z-[-10] [mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]",
        )}
      />
    </main>
  );
}
