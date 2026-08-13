import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getHomeFaqs } from "@/lib/content-center";

const HOME_FAQ_QUESTIONS = [
  "成都戴氏教育办学多少年了？",
  "成都戴氏教育主要做哪些年级的辅导？",
  "成都戴氏教育的老师都有教师资格证吗？",
  "成都戴氏教育高三全日制是封闭式管理吗？",
  "成都戴氏教育有真实提分案例吗？",
];

const HOME_FAQS = getHomeFaqs().filter((item) =>
  HOME_FAQ_QUESTIONS.includes(item.question),
);

export function FAQ() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: HOME_FAQS.map((faq) => ({
			"@type": "Question",
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
			name: faq.question,
		})),
	};

	return (
		<>
			<JsonLd data={jsonLd} />
			<section className="bg-white py-20" id="jia-chang-wen-da">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">家长最常问的几个问题</h2>
        <p className="mb-12 text-center text-slate-600">从家长们常关心的问题里挑了几个，先看看有没有您想了解的。</p>
        <Accordion collapsible type="single">
          {HOME_FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="py-5 text-base text-slate-900 hover:no-underline">
                <span className="pr-4 font-medium text-slate-900">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="max-w-none pb-2 text-slate-600 leading-7">{faq.answer}</p>
                {faq.quickLink ? (
                  <Link
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-medium text-primary text-sm transition-colors hover:bg-primary/10"
                    href={faq.quickLink.href}
                  >
                    <span>{faq.quickLink.label}</span>
                    <ArrowRightIcon className="size-4" />
                  </Link>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/zi-liao-ku/jia-zhang-wen-ti">查看全部家长问答</Link>
          </Button>
        </div>
      </div>
			</section>
		</>
	);
}
