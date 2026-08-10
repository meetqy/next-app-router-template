import type { Metadata } from "next";
import { AdmissionsEntry } from "@/components/home/AdmissionsEntry";
import { AIDiagnosis } from "@/components/home/AIDiagnosis";
import { BrandOverview } from "@/components/home/BrandOverview";
import { CampusEnvironment } from "@/components/home/CampusEnvironment";
import { ConsultationGuide } from "@/components/home/ConsultationGuide";
import { CoreEndorsement } from "@/components/home/CoreEndorsement";
import { ExamNews } from "@/components/home/ExamNews";
import { FAQ } from "@/components/home/FAQ";
import { FacultyTeam } from "@/components/home/FacultyTeam";
import { FullTimeProgram } from "@/components/home/FullTimeProgram";
import { HeadquartersHub } from "@/components/home/HeadquartersHub";
import { HeroBanner } from "@/components/home/HeroBanner";
import { HomeSchoolService } from "@/components/home/HomeSchoolService";
import { Honors } from "@/components/home/Honors";
import { ManagementSystem } from "@/components/home/ManagementSystem";
import { StudentParentFeedback } from "@/components/home/StudentParentFeedback";
import { TeachingSystem } from "@/components/home/TeachingSystem";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main>
        <HeroBanner />
        <BrandOverview />
        <CoreEndorsement />
        <HeadquartersHub />
        <Honors />
        <FullTimeProgram />
        <TeachingSystem />
        <FacultyTeam />
        <ManagementSystem />
        <HomeSchoolService />
        <AIDiagnosis />
        <CampusEnvironment />
        <StudentParentFeedback />
        <AdmissionsEntry />
        <FAQ />
        <ConsultationGuide />
        <ExamNews />
      </main>
    </div>
  );
}
