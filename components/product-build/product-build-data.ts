/**
 * The contents of the simulated interface in FIG. 02.
 *
 * ── Read this before reusing anything here ──────────────────────────────
 * Everything in this file is **demonstration interface content**. The trip
 * IDs, vehicle numbers, driver initials, routes, times, loads and counts are
 * sample values that exist so the drawing reads as a working product instead
 * of an empty wireframe. None of them are project results, client data, or
 * outcomes of any kind, and none of them may be presented as portfolio
 * evidence. That is why they live here, in the component folder, rather than
 * in `features/home/constants/data.ts` where the site's real content lives.
 *
 * What *is* drawn from real work is the shape: the navigation modules, the
 * trip state machine and the four vehicle status colours come from the Kudra
 * case study (`features/case-study-kudra/constants/data.ts` —
 * `ARCHITECTURE_MODULES`, `LIFECYCLE_STATES`, `STATUS_COLORS`), and the
 * status-first column ordering is one of its documented UI decisions. The
 * information architecture is real; the rows in it are not.
 */

export interface NavGroup {
  label: string;
  items: string[];
}

/** Kudra's modules, grouped the way an operations console would group them. */
export const NAV_GROUPS: NavGroup[] = [
  { label: "Operations", items: ["Overview", "Trips", "Vehicles", "Drivers", "Routes"] },
  { label: "Saved views", items: ["My trips", "At risk", "Today's dispatch"] },
  { label: "Insights", items: ["Reports", "Analytics"] },
  { label: "Admin", items: ["Locations", "Settings"] },
];

/**
 * The rail's foot block. Kudra's four vehicle statuses, verbatim from the case
 * study's `STATUS_COLORS` — a live fleet summary is what an operations console
 * keeps in the corner of the eye, and it is what stops the sidebar trailing
 * off into empty space.
 */
export const FLEET_STATUS: { state: string; count: number; color: string }[] = [
  { state: "Moving", count: 61, color: "#22c55e" },
  { state: "Halted", count: 14, color: "#956807" },
  { state: "Stopped", count: 9, color: "#ef4444" },
  { state: "Inactive", count: 12, color: "#6b7280" },
];

/** Which nav item reads as the current page. */
export const NAV_ACTIVE = "Trips";

export interface Kpi {
  label: string;
  value: string;
  /** Small supporting line. Sample context, not a measured result. */
  note: string;
  trend?: "up" | "down";
  tone?: "risk" | "warn";
  /** 0-1. Drives the small progress rule under the value. */
  fill: number;
}

export const KPIS: Kpi[] = [
  { label: "Active trips", value: "42", note: "+6 since 06:00", trend: "up", fill: 0.68 },
  { label: "Vehicles in operation", value: "84", note: "of 96 in fleet", fill: 0.875 },
  {
    label: "Trips at risk",
    value: "5",
    note: "3 delayed en route",
    trend: "up",
    tone: "risk",
    fill: 0.32,
  },
  { label: "Pending actions", value: "12", note: "3 overdue", tone: "warn", fill: 0.45 },
];

export type TripState = "Active" | "Delayed" | "At risk" | "Completed" | "Scheduled";

/**
 * The trip states, coloured from Kudra's real status palette. `Scheduled`
 * draws as an outline rather than a fill — nothing is happening yet, and a
 * filled dot would say it is.
 */
export const STATE_COLOR: Record<TripState, string> = {
  Active: "#22c55e",
  Delayed: "#956807",
  "At risk": "#ef4444",
  Completed: "#6b7280",
  Scheduled: "transparent",
};

export interface TripRow {
  state: TripState;
  trip: string;
  vehicle: string;
  driver: string;
  route: string;
  departure: string;
  eta: string;
  /** Percent full, or null for a trip that has not loaded yet. */
  load: number | null;
  priority: "High" | "Med" | "Low";
}

/** Status first, because state outranks detail — Kudra's own UI decision. */
export const COLUMNS = [
  { key: "state", label: "Status", width: "w-[13%]" },
  { key: "trip", label: "Trip", width: "w-[10%]" },
  { key: "vehicle", label: "Vehicle", width: "w-[10%]" },
  { key: "driver", label: "Driver", width: "w-[12%]" },
  { key: "route", label: "Route", width: "w-[22%]" },
  { key: "departure", label: "Dep", width: "w-[8%]" },
  { key: "eta", label: "ETA", width: "w-[8%]" },
  { key: "load", label: "Load", width: "w-[9%]" },
  { key: "priority", label: "Priority", width: "w-[8%]" },
] as const;

export const ROWS: TripRow[] = [
  {
    state: "Active",
    trip: "TRP-1042",
    vehicle: "VH-204",
    driver: "A. Kumar",
    route: "Chennai → Bengaluru",
    departure: "06:10",
    eta: "14:20",
    load: 82,
    priority: "High",
  },
  {
    state: "At risk",
    trip: "TRP-1043",
    vehicle: "VH-118",
    driver: "R. Singh",
    route: "Pune → Mumbai",
    departure: "07:45",
    eta: "11:05",
    load: 64,
    priority: "High",
  },
  {
    state: "Active",
    trip: "TRP-1044",
    vehicle: "VH-316",
    driver: "P. Rao",
    route: "Hyderabad → Chennai",
    departure: "05:20",
    eta: "16:40",
    load: 91,
    priority: "Med",
  },
  {
    state: "Delayed",
    trip: "TRP-1045",
    vehicle: "VH-092",
    driver: "M. Iqbal",
    route: "Nagpur → Raipur",
    departure: "04:55",
    eta: "12:50",
    load: 73,
    priority: "High",
  },
  {
    state: "Active",
    trip: "TRP-1046",
    vehicle: "VH-227",
    driver: "S. Nair",
    route: "Kochi → Coimbatore",
    departure: "08:30",
    eta: "13:15",
    load: 47,
    priority: "Med",
  },
  {
    state: "Completed",
    trip: "TRP-1047",
    vehicle: "VH-158",
    driver: "D. Verma",
    route: "Surat → Ahmedabad",
    departure: "03:10",
    eta: "08:25",
    load: 100,
    priority: "Low",
  },
  {
    state: "Scheduled",
    trip: "TRP-1048",
    vehicle: "VH-341",
    driver: "K. Menon",
    route: "Vizag → Vijayawada",
    departure: "11:00",
    eta: "17:30",
    load: null,
    priority: "Low",
  },
  {
    state: "Active",
    trip: "TRP-1049",
    vehicle: "VH-263",
    driver: "T. Sharma",
    route: "Indore → Bhopal",
    departure: "09:15",
    eta: "12:40",
    load: 58,
    priority: "Med",
  },
  {
    state: "Active",
    trip: "TRP-1050",
    vehicle: "VH-175",
    driver: "J. Thomas",
    route: "Madurai → Trichy",
    departure: "07:20",
    eta: "10:45",
    load: 69,
    priority: "Med",
  },
  {
    state: "Delayed",
    trip: "TRP-1051",
    vehicle: "VH-088",
    driver: "B. Ghosh",
    route: "Kolkata → Durgapur",
    departure: "06:40",
    eta: "09:55",
    load: 55,
    priority: "Med",
  },
  {
    state: "Active",
    trip: "TRP-1052",
    vehicle: "VH-299",
    driver: "N. Patel",
    route: "Jaipur → Udaipur",
    departure: "05:50",
    eta: "12:10",
    load: 77,
    priority: "Low",
  },
  {
    state: "Scheduled",
    trip: "TRP-1053",
    vehicle: "VH-412",
    driver: "V. Reddy",
    route: "Guntur → Nellore",
    departure: "13:30",
    eta: "18:05",
    load: null,
    priority: "Low",
  },
];

/** The row the interface treats as selected. Drives the detail panel. */
export const SELECTED_ROW = 1;

/** The row under the pointer. One of the interaction states. */
export const HOVERED_ROW = 6;

export const FILTERS = ["Status", "Vehicle", "Driver", "Route", "Date"];
export const SEGMENTS = ["All", "Active", "Delayed", "Completed"];
/** Which segment reads as pressed. */
export const SEGMENT_ACTIVE = 1;

/** Fleet utilisation, twelve days. Sample shape, not a measurement. */
export const UTILISATION = [54, 61, 58, 72, 66, 78, 74, 69, 83, 77, 88, 81];

export const STATUS_SPLIT: { label: string; count: number; share: number; color: string }[] = [
  { label: "Created", count: 6, share: 0.14, color: "#9ca3af" },
  { label: "Dispatched", count: 9, share: 0.21, color: "#E8A33D" },
  { label: "Ongoing", count: 18, share: 0.43, color: "#22c55e" },
  { label: "Completed", count: 4, share: 0.1, color: "#6b7280" },
  { label: "At risk", count: 5, share: 0.12, color: "#ef4444" },
];

export const ACTIVITY: { time: string; event: string }[] = [
  { time: "10:02", event: "Checkpoint reached — TRP-1044" },
  { time: "09:37", event: "Route updated — TRP-1042" },
  { time: "09:15", event: "Vehicle assigned — VH-118" },
  { time: "08:42", event: "Trip dispatched — TRP-1049" },
  { time: "08:20", event: "Halt logged — VH-092, 24 min" },
  { time: "08:04", event: "Fuel recorded — VH-204, 62 L" },
  { time: "07:48", event: "Trip created — TRP-1050" },
  { time: "07:31", event: "Driver assigned — R. Singh" },
  { time: "07:12", event: "Branch notified — Bengaluru hub" },
];

/** The inspector for the selected row. Mirrors `ROWS[SELECTED_ROW]`. */
export const DETAIL = {
  trip: "TRP-1043",
  state: "At risk" as TripState,
  fields: [
    { label: "Vehicle", value: "VH-118" },
    { label: "Driver", value: "R. Singh" },
    { label: "Route", value: "Pune → Mumbai" },
    { label: "Load", value: "64%" },
  ],
  timeline: [
    { label: "Created", done: true },
    { label: "Dispatched", done: true },
    { label: "Ongoing", done: true },
    { label: "Completed", done: false },
  ],
  action: "Reassign vehicle",
};

export const TABLE_FOOTER = { showing: "1–12", total: "42" };

/**
 * Shown under the drawing. The section is a construction demonstration, and
 * saying so in the frame is the difference between a figure and a claim.
 */
export const CAPTION =
  "Demonstration interface — information architecture from the Kudra case study. Values shown are UI samples, not project results.";
