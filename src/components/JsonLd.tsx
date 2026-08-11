export function JsonLd({ data }: { data: unknown }) {
	const serialized = (JSON.stringify(data) ?? "").replace(/</g, "\\u003c");

	return (
		<script
			dangerouslySetInnerHTML={{ __html: serialized }}
			type="application/ld+json"
		/>
	);
}
