import Image from "next/image";
import { Inter } from "next/font/google";
import PromptEngineeringForm from './PromptEngineeringForm'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PromptEngineeringForm />
      <footer className="text-center mt-10">
        Created by Alan Asmis
      </footer>
    </main>
  );
}
