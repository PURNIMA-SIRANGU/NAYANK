"use client";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        marginBottom: "28px",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          margin: 0,
          fontFamily:
            "Space Grotesk, sans-serif",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            color: "#94A3B8",
            marginTop: "8px",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}