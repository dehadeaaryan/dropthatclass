import Header from "@/components/header";
import Footer from "@/components/footer";
import Button from "@/components/ui/button";
import Link from "next/link";

const intro = `DropThatClass provides students with up-to-date professor reviews, enabling them to make informed class selections for the upcoming semester.`

export default async function Home() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center bg-white gap-2">
            <Header />
            <div className="flex flex-1 w-full gap-4 px-4">
                <div className="flex flex-col basis-3/4 items-center justify-center font-mono rounded-3xl bg-black shadow-[0_0px_24px_12px_rgba(0,0,0,0.3)] gap-12">
                    <h1 className="w-full text-white text-center font-extrabold text-5xl md:text-7xl lg:text-8xl drop-shadow-[0_0.5rem_0.5rem_rgba(255,255,255,0.5)] animate-[dropshadow_8s_ease-in-out_infinite]">
                        {`DropThatClass`}
                    </h1>
                    <Link href="/app">
                        <Button>Go to App</Button>
                    </Link>
                </div>
                <div className="flex flex-col basis-1/4 shadow-[0_0px_24px_12px_rgba(0,0,0,0.3)] rounded-3xl items-center justify-center gap-2 p-8">
                    <p className="text-center font-light text-3xl leading-normal">
                        {intro}
                    </p>
                    <Link href="/about">
                        <Button>Learn More</Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    );
}
