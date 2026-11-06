import { EmailButton } from "./email-button";
import { Scene } from "./scene";

export function Hero() {
  return (
    <header>
      <div className="wrap grid min-h-screen grid-cols-[1fr_560px] items-center gap-12 pt-20 pb-10 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[900px]:pt-24">
        <div>
          <h1 className="heading-1 max-w-[680px] bg-linear-to-r from-(--h1a) to-(--h1b) bg-clip-text text-transparent">
            <span className="load-rise block">I build voice agents.</span>
            <span className="load-rise block [animation-delay:80ms]">The rest of the time, I am here.</span>
          </h1>
          <p className="title-1 load-fade mt-6 max-w-[680px] text-muted [animation-delay:160ms]">
            AI engineer in the Bay Area, working on agents that listen and talk back. This is my desk at{" "}
            <span className="day:hidden">2am</span>
            <span className="hidden day:inline">2pm</span>, more or less.
          </p>
          <div className="load-fade mt-8 flex items-center gap-6 [animation-delay:240ms] max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-4">
            <EmailButton />
            <span className="caption-5 text-dim">
              <b className="font-medium text-muted">Winner, CruzHacks 2025</b> and runner up at the smallest.ai
              hackathon
            </span>
          </div>
        </div>
        <div>
          <Scene />
          <p className="caption-5 mt-4 text-center text-balance text-dim">
            <b className="font-medium text-muted">drag</b> to look around &nbsp; <b className="font-medium text-muted">hover</b>{" "}
            anything &nbsp; <b className="font-medium text-muted">click</b> to go there
          </p>
        </div>
      </div>
    </header>
  );
}
