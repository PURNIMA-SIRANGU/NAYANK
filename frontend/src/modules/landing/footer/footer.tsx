"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{
        opacity: 0,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
      }}
      transition={{
        duration: 1,
      }}
      style={{
        padding: "120px 8% 60px",
        background: "#040B14",
        borderTop: "1px solid rgba(255,255,255,.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "50px",
        }}
      >
        {/* NAYANK */}

        <motion.div
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "20px",
              color: "#FFFFFF",
              fontFamily: "Space Grotesk",
            }}
          >
            NAYANK
          </h2>

          <p
            style={{
              color: "#94A3B8",
              lineHeight: 1.9,
            }}
          >
            AI Powered Investigation Ecosystem
            transforming evidence into actionable
            intelligence for modern investigations.
          </p>

          <br />

          <p
            style={{
              color: "#60A5FA",
              fontSize: ".95rem",
            }}
          >
            Developed for SAFER ELURU
            <br />
            RTIH Amaravati Innovation Program
          </p>
        </motion.div>

        {/* PRODUCTS */}

        <motion.div
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 0.5,
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            Products
          </h3>

          <p
            style={{
              color: "#94A3B8",
              lineHeight: 2,
            }}
          >
            NETHR◉I
            <br />
            Visual Intelligence Engine

            <br />
            <br />

            SA⌇⌇⌇KET
            <br />
            Audio Intelligence Engine
          </p>
        </motion.div>

        {/* PLATFORM */}

        <motion.div
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            Platform
          </h3>

          <p
            style={{
              color: "#94A3B8",
              lineHeight: 2,
            }}
          >
            Investigation Workflow
            <br />
            Evidence Correlation
            <br />
            Timeline Intelligence
            <br />
            Risk Assessment
          </p>
        </motion.div>

        {/* PARI */}

        <motion.div
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1.5,
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            PARI
          </h3>

          <p
            style={{
              color: "#94A3B8",
              lineHeight: 1.9,
            }}
          >
            Founder & CEO
            <br />
            <span
              style={{
                color: "#FFFFFF",
                fontWeight: 600,
              }}
            >
              Purnima Sirangu
            </span>
          </p>

          <br />

          <p
            style={{
              color: "#94A3B8",
              lineHeight: 1.9,
            }}
          >
            Co-Founder
            <br />
            <span
              style={{
                color: "#FFFFFF",
                fontWeight: 600,
              }}
            >
              Pavan Maladi
            </span>
          </p>
        </motion.div>
      </div>

      <div
        style={{
          marginTop: "80px",
          paddingTop: "30px",
          borderTop:
            "1px solid rgba(255,255,255,.08)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            color: "#64748B",
          }}
        >
          © 2026 NAYANK. All Rights Reserved.
        </div>

        <div
          style={{
            color: "#64748B",
          }}
        >
          Built with AI • Built for Investigation • SAFER ELURU
        </div>
      </div>
    </motion.footer>
  );
}