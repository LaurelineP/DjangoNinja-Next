import Link from "next/link";
import Logo from "../components/logo";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 ]">
      <main className="flex flex-col row-start-2 items-center -mt-20">
		<Logo/>
        <div className="flex gap-4 items-center flex-col sm:flex-row -mt-8 z-10">
			<Link href="/dashboard" className="w-full cursor-pointer rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors inline-flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#317] dark:hover:border-[#316] dark:hover:shadow-[0_2px_10px_1px_#103] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">Dashboard</Link>
			<Link href="/devices" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors inline-flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#317] dark:hover:border-[#316] dark:hover:shadow-[0_2px_10px_1px_#103] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">Devices</Link>
        </div>
      </main>
    </div>
  );
}
