import { AddNewData } from "@components/addNewData";
import { NavBar } from "@components/navbar";
import { Tables } from "@components/tables";
import { TimeLine } from "@components/timeLine";
import "./index.css";
import { DataInfo } from "@components/dataInfo";
import { Hero } from "@components/hero";
import { Footer } from "@components/footer";
import Joyride, { CallBackProps, Step } from "react-joyride";
import { useState } from "react";
import { steps } from "../../joyride/tourSteps";

export const Home = () => {
  const [run, setRun] = useState(false);

  const handleStartTour = () => {
    setRun(true);
  };

  const handleTourCallback = (data: CallBackProps) => {
    if (data && data.status === "finished" || data.status === "skipped") {
      setRun(false);
    }
  };

  return (
    <>
      <div className="background"></div>
      <section className="flex flex-col max-w-full overflow-hidden">
        <div className="z-10 overflow-x-hidden">
          <Joyride
            steps={steps as Step[]}
            run={run}
            continuous
            showSkipButton
            hideCloseButton
            callback={handleTourCallback}
            styles={{
              options: {
                zIndex: 10000,
              },
            }}
          />
          <NavBar />
          <Hero onStartTour={handleStartTour} />
          <TimeLine />
          <AddNewData />
          <Tables />
          <DataInfo />
          <Footer />

        </div>
      </section>
    </>
  );
};