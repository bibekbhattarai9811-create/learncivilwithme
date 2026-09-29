import { notFound } from "next/navigation";
import { PHASES, getPhase } from "@/lib/roadmap";
import PhaseView from "./PhaseView";

export const dynamicParams = false; // required for static export

export function generateStaticParams() {
  return PHASES.map((p) => ({ phase: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ phase: string }> }) {
  const { phase } = await params;
  const p = getPhase(phase);
  return { title: p ? `Phase ${p.num}: ${p.title} — LearnCivilWithMe` : "LearnCivilWithMe" };
}

export default async function Page({ params }: { params: Promise<{ phase: string }> }) {
  const { phase } = await params;
  if (!getPhase(phase)) notFound();
  return <PhaseView id={phase} />;
}
