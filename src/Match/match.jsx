import React, { useState } from "react";
import "./App.css";
import {
  Trophy,
  MapPin,
  Calendar,
  Circle,
  CircleCheck,
  CircleX,
  ShieldCheck,
  Timer,
} from "lucide-react";

const PALETTE = {
  pitch: "#b9e1d5",
  pitchDeep: "#99bab0",
  sand: "#F3EDE0",
  moroccoRed: "#C1272D",
  dutchOrange: "#F2711C",
  line: "#9e9c7f",
};

const statRows = [
  { label: "Possession", ned: 31, mar: 61, suffix: "%", max: 100 },
  { label: "Total shots", ned: 6, mar: 11, suffix: "", max: 11 },
  { label: "Shots on target", ned: 2, mar: 5, suffix: "", max: 5 },
  { label: "Shots off target", ned: 2, mar: 4, suffix: "", max: 4 },
  { label: "Shots inside the box", ned: 4, mar: 5, suffix: "", max: 5 },
];

const timeline = [
  {
    minute: "72'",
    team: "ned",
    title: "Goal — Cody Gakpo",
    detail: "Netherlands 1–0, a break from Summerville sets it up",
  },
  {
    minute: "90+1'",
    team: "mar",
    title: "Goal — Issa Diop (header)",
    detail: "Netherlands 1–1, Talbi's cross is met at the far post",
  },
  {
    minute: "120'",
    team: "neutral",
    title: "No further goals",
    detail: "Rahimi denied by Verbruggen at point-blank range in extra time",
  },
];

const shootout = {
  ned: [
    { name: "Koopmeiners", outcome: "goal" },
    { name: "Kluivert", outcome: "post" },
    { name: "Timber", outcome: "miss" },
    { name: "Summerville", outcome: "saved" },
  ],
  mar: [
    { name: "El Aynaoui", outcome: "crossbar" },
    { name: "—", outcome: "goal" },
    { name: "—", outcome: "goal" },
    { name: "Hakimi", outcome: "post" },
    { name: "Saibari", outcome: "winner" },
  ],
};


function OutcomeIcon({ outcome }) {
  if (outcome === "goal" || outcome === "winner") {
    return <CircleCheck className="md-icon-xs" style={{ color: "#7CC48B" }} />;
  }
  if (outcome === "saved") {
    return <ShieldCheck className="md-icon-xs" style={{ color: "#F3EDE0" }} />;
  }
  return <CircleX className="md-icon-xs" style={{ color: "#E8A0A0" }} />;
}

function StatBar({ row }) {
  const nedPct = (row.ned / row.max) * 100;
  const marPct = (row.mar / row.max) * 100;
  return (
    <div className="md-stat-row">
      <div className="md-stat-labels">
        <span className="md-stat-value-ned">
          {row.ned}
          {row.suffix}
        </span>
        <span className="md-stat-label">{row.label}</span>
        <span className="md-stat-value-mar">
          {row.mar}
          {row.suffix}
        </span>
      </div>
      <div className="md-stat-bars">
        <div className="md-stat-bar-track md-stat-bar-track-ned">
          <div
            className="md-stat-bar-fill"
            style={{ width: `${nedPct}%`, backgroundColor: PALETTE.dutchOrange }}
          />
        </div>
        <div className="md-stat-bar-track">
          <div
            className="md-stat-bar-fill"
            style={{ width: `${marPct}%`, backgroundColor: PALETTE.moroccoRed }}
          />
        </div>
      </div>
    </div>
  );
}

function ShootoutColumn({ teamLabel, teamColor, kicks, align }) {
  return (
    <div className="md-shootout-col">
      <p className="md-shootout-heading" style={{ color: teamColor, textAlign: align }}>
        {teamLabel}
      </p>
      <div className="md-shootout-list">
        {kicks.map((k, i) => (
          <div
            key={i}
            className="md-shootout-kick"
            style={{ flexDirection: align === "right" ? "row-reverse" : "row" }}
          >
            <OutcomeIcon outcome={k.outcome} />
            <span className="md-shootout-name" style={{ textAlign: align }}>
              {k.name}
            </span>
            <span className="md-shootout-outcome">
              {k.outcome === "winner" ? "winning kick" : k.outcome}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MatchDashboard() {
  const [tab, setTab] = useState("stats");

  return (
    <div className="md-root">
 
      <div className="md-card">
        {/* header */}
        <div className="md-header">
          <div className="md-meta">
            <span className="md-meta-item">
              <Trophy className="md-icon-xs" /> FIFA World Cup 2026 · Round of 32
            </span>
            <span className="md-meta-item">
              <MapPin className="md-icon-xs" /> Monterrey Stadium
            </span>
            <span className="md-meta-item">
              <Calendar className="md-icon-xs" /> 29 Jun 2026
            </span>
          </div>

          <div className="md-scoreboard">
            <div className="md-team">
              <div className="md-badge md-badge-ned">NED</div>
              <p className="md-team-name">Netherlands</p>
            </div>

            <div className="md-team">
              <p className="md-score">1 – 1</p>
              <p className="md-score-sub">
                <Timer className="md-icon-xs" style={{ width: 12, height: 12 }} /> after extra time
              </p>
            </div>

            <div className="md-team">
              <div className="md-badge md-badge-mar">MAR</div>
              <p className="md-team-name">Morocco</p>
            </div>
          </div>

          <div className="md-result-banner">
            Morocco win 3–2 on penalties, advance to the round of 16
          </div>
        </div>

        {/* tabs */}
        <div className="md-tabs">
          {[
            { id: "stats", label: "Match stats" },
            { id: "timeline", label: "Timeline" },
            { id: "shootout", label: "Shootout" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`md-tab ${tab === t.id ? "md-tab-active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        
        <div className="md-content">
          {tab === "stats" && (
            <div>
              {statRows.map((row) => (
                <StatBar key={row.label} row={row} />
              ))}
            </div>
          )}

          {tab === "timeline" && (
            <div>
              {timeline.map((ev, i) => (
                <div
                  key={i}
                  className={`md-timeline-item ${i < timeline.length - 1 ? "md-timeline-item-divider" : ""}`}
                >
                  <span className="md-timeline-minute">{ev.minute}</span>
                  <Circle
                    className="md-timeline-dot"
                    style={{
                      fill:
                        ev.team === "ned"
                          ? PALETTE.dutchOrange
                          : ev.team === "mar"
                          ? PALETTE.moroccoRed
                          : "#8FA89A",
                    }}
                  />
                  <div>
                    <p className="md-timeline-title">{ev.title}</p>
                    <p className="md-timeline-detail">{ev.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "shootout" && (
            <div className="md-shootout">
              <ShootoutColumn
                teamLabel="Netherlands"
                teamColor={PALETTE.dutchOrange}
                kicks={shootout.ned}
                align="left"
              />
              <div className="md-shootout-divider" />
              <ShootoutColumn
                teamLabel="Morocco"
                teamColor={PALETTE.moroccoRed}
                kicks={shootout.mar}
                align="right"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
