import { notFound } from "next/navigation";
import { TESTS, getTest } from "@/lib/tests";
import TestRunner from "./TestRunner";

export const dynamicParams = false;

export function generateStaticParams() {
  return TESTS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `${getTest(id)?.title ?? "Test"} — LearnCivilWithMe` };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getTest(id)) notFound();
  return <TestRunner id={id} />;
}
