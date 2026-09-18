import { createFileRoute } from "@tanstack/react-router";
import { BirthdayExperience } from "../components/BirthdayExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Birthday Surprise for [HER NAME]" },
      { name: "description", content: "A personalised birthday surprise filled with memories, laughter, and a little pink magic." },
      { property: "og:title", content: "A Birthday Surprise for [HER NAME]" },
      { property: "og:description", content: "A personalised birthday surprise filled with memories, laughter, and a little pink magic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <BirthdayExperience />;
}
