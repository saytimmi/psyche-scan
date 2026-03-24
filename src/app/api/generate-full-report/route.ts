import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { FullScanReport, type FullReportData, type PassportData } from "@/lib/full-report-template";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile, passport } = body as { profile: unknown; passport: unknown };

    if (!profile || !passport) {
      return NextResponse.json(
        { error: "profile and passport are required" },
        { status: 400 }
      );
    }

    // Validate passport is structured JSON (not a markdown string)
    if (typeof passport === "string") {
      return NextResponse.json(
        { error: "passport must be a structured JSON object, not a markdown string. Required fields: whoYouAre, paradoxes, scenarioRecognitions, crossAnalysis, strengths, blindSpots, growthPlan, aiProfile, workWithMe" },
        { status: 400 }
      );
    }

    const passportData = passport as PassportData;

    // Provide defaults for missing fields to avoid render crashes
    const safePassport: PassportData = {
      whoYouAre: passportData.whoYouAre || "",
      paradoxes: passportData.paradoxes || [],
      scenarioRecognitions: passportData.scenarioRecognitions || [],
      crossAnalysis: {
        workPattern: passportData.crossAnalysis?.workPattern || { headline: "", text: "" },
        relationshipPattern: passportData.crossAnalysis?.relationshipPattern || { headline: "", text: "" },
        stressPattern: passportData.crossAnalysis?.stressPattern || { headline: "", text: "" },
      },
      strengths: passportData.strengths || [],
      blindSpots: passportData.blindSpots || [],
      growthPlan: passportData.growthPlan || [],
      aiProfile: passportData.aiProfile || "",
      workWithMe: passportData.workWithMe || [],
    };

    const reportData: FullReportData = {
      profile: profile as FullReportData["profile"],
      passport: safePassport,
      generatedAt: new Date().toISOString(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(FullScanReport, { data: reportData }) as any;
    const buffer = await renderToBuffer(element);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="psyche-scan-full-report.pdf"',
      },
    });
  } catch (err) {
    console.error("Full report PDF generation error:", err instanceof Error ? err.stack : err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `PDF generation failed: ${message}` },
      { status: 500 }
    );
  }
}
