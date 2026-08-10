import type { Metadata } from "next";
import { FloatingToolbar } from "@/components/floating-toolbar";
import { GlobalHeader } from "@/components/global-header";
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
import { Footer } from "@/components/home/Footer";
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
  description:
    "成都戴氏教育高考中心总部官网，提供品牌介绍、高考中心、全日制、招生简章与电话咨询入口。",
  title: "成都戴氏教育高考中心总部官网",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <GlobalHeader />
      <main className="flex-1">
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
      <Footer />
      <FloatingToolbar />
    </div>
  );
}
