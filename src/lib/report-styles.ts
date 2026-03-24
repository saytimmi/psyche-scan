import { StyleSheet, Font } from "@react-pdf/renderer";
import path from "path";

// Register Inter font with Cyrillic support
const fontsDir = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Inter",
  fonts: [
    { src: path.join(fontsDir, "Inter-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "Inter-Bold.ttf"), fontWeight: 700 },
    { src: path.join(fontsDir, "Inter-LightItalic.ttf"), fontWeight: 400, fontStyle: "italic" },
  ],
});

// Ember theme colors
export const colors = {
  bg: "#0A0A0A",
  bgCard: "#141414",
  bgCardAlt: "#1A1A1A",
  accent: "#f97316", // orange
  accentDim: "#c2410c",
  lime: "#D2FF00",
  red: "#dc2626",
  amber: "#fbbf24",
  white: "#FFFFFF",
  text: "#E5E5E5",
  textMuted: "#9CA3AF",
  textDim: "#6B7280",
  border: "#262626",
  borderAccent: "rgba(249, 115, 22, 0.3)",
};

export const styles = StyleSheet.create({
  // Layout
  page: {
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily: "Inter",
    padding: 0,
  },
  pageInner: {
    padding: 40,
    flex: 1,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 40,
    fontSize: 8,
    color: colors.textDim,
    fontFamily: "Inter",
  },

  // Cover
  coverPage: {
    backgroundColor: colors.bg,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },
  coverBrand: {
    fontSize: 10,
    letterSpacing: 6,
    color: colors.accent,
    textTransform: "uppercase" as const,
    marginBottom: 40,
    fontFamily: "Inter",
    fontWeight: 700,
  },
  coverTitle: {
    fontSize: 42,
    color: colors.white,
    fontFamily: "Inter",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 8,
  },
  coverModifier: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 40,
  },
  coverStat: {
    fontSize: 11,
    color: colors.accent,
    fontFamily: "Inter",
    textAlign: "center",
    marginBottom: 6,
  },
  coverDate: {
    fontSize: 9,
    color: colors.textDim,
    textAlign: "center",
    marginTop: 30,
  },
  coverLine: {
    width: 60,
    height: 1,
    backgroundColor: colors.accent,
    marginBottom: 30,
  },

  // Section headers
  sectionTag: {
    fontSize: 8,
    letterSpacing: 4,
    color: colors.accent,
    textTransform: "uppercase" as const,
    fontFamily: "Inter",
    fontWeight: 700,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 24,
    color: colors.white,
    fontFamily: "Inter",
    fontWeight: 700,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 20,
    lineHeight: 1.6,
  },

  // Cards
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardAccent: {
    backgroundColor: colors.bgCard,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderAccent,
  },

  // Text
  bodyText: {
    fontSize: 10,
    color: colors.text,
    lineHeight: 1.7,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 8,
    color: colors.textMuted,
    lineHeight: 1.5,
  },
  labelText: {
    fontSize: 8,
    color: colors.textDim,
    textTransform: "uppercase" as const,
    letterSpacing: 2,
    fontFamily: "Inter",
    fontWeight: 700,
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: "Inter",
    fontWeight: 700,
  },
  monoText: {
    fontSize: 9,
    color: colors.accent,
    fontFamily: "Inter",
  },

  // Scale bars
  barContainer: {
    marginBottom: 8,
  },
  barLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  barTrack: {
    height: 6,
    backgroundColor: colors.bgCardAlt,
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: 6,
    borderRadius: 3,
  },

  // Grid
  row: {
    flexDirection: "row",
    gap: 10,
  },
  col2: {
    flex: 1,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },

  // Numbered list
  listItem: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },
  listNumber: {
    fontSize: 10,
    color: colors.accent,
    fontFamily: "Inter",
    fontWeight: 700,
    width: 20,
  },
  listContent: {
    flex: 1,
    fontSize: 10,
    color: colors.text,
    lineHeight: 1.6,
  },

  // Quote block
  quoteBlock: {
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
    paddingLeft: 14,
    marginVertical: 12,
  },
  quoteText: {
    fontSize: 11,
    color: colors.white,
    lineHeight: 1.7,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: colors.textDim,
  },
});
