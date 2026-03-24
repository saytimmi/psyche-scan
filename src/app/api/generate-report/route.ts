import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { FreeTestReport, type ReportData } from "@/lib/report-template";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scoring, aiResult } = body as { scoring: unknown; aiResult: unknown };

    if (!scoring || !aiResult) {
      return NextResponse.json({ error: "scoring and aiResult required" }, { status: 400 });
    }

    const reportData: ReportData = {
      scoring: scoring as ReportData["scoring"],
      aiResult: aiResult as ReportData["aiResult"],
      generatedAt: new Date().toISOString(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(FreeTestReport, { data: reportData }) as any;
    const buffer = await renderToBuffer(element);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="psyche-scan-report.pdf"',
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `PDF generation failed: ${message}` }, { status: 500 });
  }
}
