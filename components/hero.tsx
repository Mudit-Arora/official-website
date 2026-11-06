import { Greeting } from "./greeting";
import { Scene } from "./scene";

export function Hero() {
  return (
    <header>
      <div className="wrap grid min-h-screen grid-cols-[1fr_560px] items-center gap-12 pt-20 pb-10 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[900px]:pt-24">
        <div>
          <Greeting />
          <p className="title-1 load-fade mt-6 max-w-[680px] text-muted [animation-delay:120ms]">
            Member of technical staff at Synhawk, where we tell real voices from fake ones. This is my desk at{" "}
            <span className="day:hidden">2am</span>
            <span className="hidden day:inline">2pm</span>, more or less.
          </p>
          <p className="caption-4 load-fade mt-8 flex flex-wrap gap-x-3 gap-y-1 text-muted [animation-delay:200ms] max-[900px]:flex-col">
            <span>Full Time Developer</span>
            <span aria-hidden="true" className="text-dim max-[900px]:hidden">|</span>
            <span>Part Time Gamer</span>
            <span aria-hidden="true" className="text-dim max-[900px]:hidden">|</span>
            <span>All Time Learner</span>
          </p>
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
