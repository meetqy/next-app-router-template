import type { ReactNode } from "react";

export default function BrochureLayout({ children }: { children: ReactNode }) {
	return <div className="brochure-page-container">{children}</div>;
}
