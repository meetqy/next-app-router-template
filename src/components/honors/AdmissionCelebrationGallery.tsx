"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AdmissionCelebrationYear } from "@/lib/admission-celebrations";
import { imageUrl } from "@/lib/image-url";

const IMAGES_PER_PAGE = 12;

type AdmissionCelebrationGalleryProps = {
  sectionId?: string;
  showHeader?: boolean;
  years: AdmissionCelebrationYear[];
};

export function AdmissionCelebrationGallery({ sectionId = "sheng-xue-xi-bao", showHeader = true, years }: AdmissionCelebrationGalleryProps) {
  const [activeYear, setActiveYear] = useState(years[0]?.year ?? "");
  const [currentPage, setCurrentPage] = useState(1);

  const activeGroup = years.find((item) => item.year === activeYear) ?? years[0];

  if (!activeGroup) {
    return null;
  }

  const totalImages = years.reduce((sum, item) => sum + item.images.length, 0);
  const totalPages = Math.max(1, Math.ceil(activeGroup.images.length / IMAGES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * IMAGES_PER_PAGE;
  const pageImages = activeGroup.images.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  return (
    <section className="rounded-2xl bg-white p-6 md:p-8 lg:p-10" id={sectionId}>
      {showHeader ? (
        <div className="flex flex-col gap-6 border-slate-200 border-b pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-semibold text-primary text-sm">升学喜报</p>
            <h2 className="mt-3 text-balance font-bold text-2xl text-slate-950 md:text-3xl">大学录取喜报展示</h2>
            <p className="mt-3 max-w-3xl text-slate-600 leading-8">按年份集中展示戴氏教育学生大学录取喜报，点击图片即可新开标签查看原图。后续新增图片时，只需继续放入对应年份目录即可自动展示。</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-500 text-sm">
            已收录 {years.length} 年，共 {totalImages} 张喜报
          </div>
        </div>
      ) : null}

      <div className={showHeader ? "mt-6 flex flex-wrap items-center gap-3" : "flex flex-wrap items-center gap-3"}>
        {years.map((year) => {
          const isActive = year.year === activeGroup.year;

          return (
            <button
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-medium text-sm transition-colors ${
                isActive ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary"
              }`}
              key={year.year}
              onClick={() => {
                setActiveYear(year.year);
                setCurrentPage(1);
              }}
              type="button"
            >
              <span>{year.year}年</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"}`}>{year.images.length}张</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-900">{activeGroup.label}</p>
          <p className="mt-1 text-slate-500 text-sm">
            第 {safePage} / {totalPages} 页
          </p>
        </div>
        {totalPages > 1 ? (
          <div className="hidden items-center gap-2 sm:flex">
            <Button disabled={safePage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} size="sm" variant="outline">
              <ChevronLeftIcon className="size-4" />
              上一页
            </Button>
            <Button disabled={safePage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} size="sm" variant="outline">
              下一页
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        ) : null}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pageImages.map((image, index) => (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50" key={image.src}>
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                alt={image.alt}
                className="object-cover"
                fill
                loading={startIndex + index < 4 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                src={imageUrl(image.src)}
              />
              <div className="absolute top-3 left-3 rounded-full bg-black/55 px-3 py-1 text-white text-xs">{activeGroup.year}年喜报</div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-6 flex flex-col gap-3 border-slate-200 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500 text-sm">
            当前显示第 {startIndex + 1} - {startIndex + pageImages.length} 张，共 {activeGroup.images.length} 张
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isCurrent = page === safePage;

              return (
                <button
                  className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm transition-colors ${
                    isCurrent ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary"
                  }`}
                  key={`${activeGroup.year}-page-${page}`}
                  onClick={() => setCurrentPage(page)}
                  type="button"
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
