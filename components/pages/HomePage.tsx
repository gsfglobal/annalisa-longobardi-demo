import { Opening } from "@/components/experience/Opening";
import { MeetAnnalisa } from "@/components/experience/MeetAnnalisa";
import { SmileArchitecture } from "@/components/experience/SmileArchitecture";
import { TreatmentsExperience } from "@/components/experience/TreatmentsExperience";
import { StudioPreview } from "@/components/experience/StudioPreview";
import { Stories } from "@/components/experience/Stories";
import { ThreeCities } from "@/components/experience/ThreeCities";
import { NextStep } from "@/components/experience/NextStep";
import { ChapterRail } from "@/components/layout/ChapterRail";

export function HomePage() {
  return (
    <>
      <ChapterRail />
      <Opening />
      <MeetAnnalisa />
      <SmileArchitecture />
      <TreatmentsExperience />
      <StudioPreview />
      <Stories />
      <ThreeCities />
      <NextStep />
    </>
  );
}
