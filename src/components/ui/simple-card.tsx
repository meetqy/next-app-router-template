import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { imageUrl } from "@/lib/image-url";

export interface SimpleCardProps {
  description?: ReactNode;
  meta?: ReactNode;
  href: string;
  imageAlt?: string;
  imageSizes?: string;
  imageSrc?: string;
  title: string;
}

export function SimpleCard({ description, meta, href, imageAlt, imageSizes = "(max-width: 768px) 100vw, 160px", imageSrc, title }: SimpleCardProps) {
  return (
    <Link className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-primary/40 hover:shadow-sm" href={href}>
      <div className={imageSrc ? "md:grid md:grid-cols-[160px_minmax(0,1fr)]" : ""}>
        {imageSrc ? (
          <div className="relative aspect-16/10 bg-slate-100 md:aspect-auto md:h-full">
            <Image alt={imageAlt ?? title} className="object-cover" fill sizes={imageSizes} src={imageUrl(imageSrc)} />
          </div>
        ) : null}
        <div className="flex h-full flex-col justify-between p-5">
          <div>
            <h3 className="wrap-break-word mb-2 font-bold text-lg text-slate-900 transition-colors group-hover:text-primary">{title}</h3>
            {description && <div className="wrap-break-word mb-4 line-clamp-2 text-slate-600 text-sm leading-relaxed">{description}</div>}
          </div>
          {meta && <div className="text-slate-400 text-xs">{meta}</div>}
        </div>
      </div>
    </Link>
  );
}
