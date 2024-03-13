import { LampDemo } from "@/components/lampDemo";

export default async function Home() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center">
            {/* <div className="z-10 w-full items-center justify-center font-mono">
                <h1 className="w-full text-center font-extrabold text-5xl md:text-8xl lg:text-9xl drop-shadow-[0_0.5rem_0.5rem_rgba(255,255,255,0.5)] animate-[dropshadow_8s_ease-in-out_infinite]">
                    {`DropThatClass`}
                </h1>
                <p className="w-full text-center text-neutral-500 text-md md:text-2xl animate-bounce">
                    {`Coming Soon`}
                </p>
            </div> */}
            <LampDemo />
        </main>
    );
}
