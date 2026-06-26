"use client";

import { useState, useEffect } from "react";
import {
  User as UserIcon,
  Shield,
  BadgeCheck,
  Phone,
  Mail,
  Camera,
  Pencil,
  Save,
  Briefcase,
  MapPin,
  Activity,
  FolderOpen,
  Upload,
  FileText,
} from "lucide-react";

interface OfficerProfileForm {
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  alternatePhone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  officerId: string;
  badgeNumber: string;
  rank: string;
  designation: string;
  department: string;
  station: string;
  bloodGroup: string;
  aadhaar: string;
  pan: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  photo: string;
}

export default function OfficerProfile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState<OfficerProfileForm>({
    userId: "a63e9a8c-b0c7-49a2-a6aa-c8f3c4cbf9df", 
    firstName: "Rajesh",
    lastName: "Kumar",
    gender: "Male",
    dob: "1994-03-14",
    phone: "+91 9876543210",
    alternatePhone: "",
    email: "rajesh@nayank.gov.in",
    address: "Police Quarters",
    city: "Eluru",
    district: "Eluru",
    state: "Andhra Pradesh",
    pincode: "534001",
    officerId: "OFF-10231", 
    badgeNumber: "AP-45982",
    rank: "Inspector",
    designation: "Investigation Officer",
    department: "Crime Investigation Department",
    station: "Eluru II Town Police Station",
    bloodGroup: "B+",
    aadhaar: "", 
    pan: "",
    emergencyName: "Pavan",
    emergencyRelation: "Spouse",
    emergencyPhone: "+91 9876543211",
    photo: "",
  });

  // Replaced fetchProfile API block with synchronous local storage retrieval
  useEffect(() => {
    const saved = localStorage.getItem("officerProfile");

    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  // Updated save handler executing purely against local storage
  const handleSave = () => {
    localStorage.setItem(
      "officerProfile",
      JSON.stringify(profile)
    );

    alert("Profile Updated Successfully!");
    setEditing(false);
  };

  const stats = [
    { title: "Assigned Cases", value: 34, icon: FolderOpen, color: "text-blue-400" },
    { title: "Evidence Uploaded", value: 286, icon: Upload, color: "text-cyan-400" },
    { title: "Reports Generated", value: 82, icon: FileText, color: "text-green-400" },
    { title: "Cases Solved", value: 27, icon: BadgeCheck, color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-[#060B13] text-slate-100 p-8 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800/60 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Officer Profile</h1>
          <p className="text-sm text-slate-400 mt-1">Manage personal and professional Prisma data directories.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 bg-slate-900/60 hover:bg-slate-800 text-slate-200 border border-slate-800 px-4 py-2.5 rounded-xl text-sm font-medium transition"
          >
            <Pencil size={16} />
            {editing ? "Cancel" : "Edit Profile"}
          </button>
          {editing && (
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              <Save size={16} />
              Save Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* PROFILE SIDEBAR CARD */}
        <div className="bg-[#0B1320] border border-slate-800/80 rounded-2xl p-6 flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full bg-slate-800/80 border-2 border-slate-700 flex items-center justify-center text-slate-400">
              <UserIcon size={48} />
            </div>
            {editing && (
              <button className="mt-3 text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1.5">
                <Camera size={14} /> Update Photo
              </button>
            )}
            <h2 className="text-xl font-bold text-white mt-4">{profile.firstName || "Officer"} {profile.lastName}</h2>
            <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">{profile.designation || "Investigation Officer"}</p>
            <span className="mt-3 px-3 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-xs font-semibold rounded-full tracking-wide">
              Active Duty Status
            </span>
          </div>

          <div className="border-t border-slate-800/60 pt-5 space-y-4 text-xs font-medium">
            <div className="flex items-center gap-3 text-slate-300">
              <Shield size={16} className="text-blue-400 shrink-0" />
              <div>
                <p className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Officer ID</p>
                <p className="font-mono mt-0.5 text-slate-200">{profile.officerId || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <BadgeCheck size={16} className="text-emerald-400 shrink-0" />
              <div>
                <p className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Badge Number</p>
                <p className="font-mono mt-0.5 text-slate-200">{profile.badgeNumber || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Briefcase size={16} className="text-cyan-400 shrink-0" />
              <div>
                <p className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Department</p>
                <p className="mt-0.5 text-slate-200">{profile.department || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin size={16} className="text-rose-400 shrink-0" />
              <div>
                <p className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Police Station Assignment</p>
                <p className="mt-0.5 text-slate-200">{profile.station || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN INTERFACES */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* STATS MATRIX GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-[#0B1320] border border-slate-800/60 rounded-xl p-5 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <Icon size={24} className={`${stat.color} opacity-80`} />
                    <Activity size={14} className="text-slate-600" />
                  </div>
                  <h3 className="text-2xl font-bold mt-4 text-white font-mono">{stat.value}</h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* EDITABLE SECTION CONTAINER */}
          <div className="bg-[#0B1320] border border-slate-800/80 rounded-2xl p-6 flex flex-col gap-6">
            
            {/* PERSONAL DATA BLOCK */}
            <div>
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800 pb-2 mb-4">
                Personal Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                <div>
                  <label className="text-slate-400 block mb-1.5">First Name</label>
                  <input
                    disabled={!editing}
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full bg-[#060B13] border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none disabled:opacity-60 disabled:cursor-not-allowed transition"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    disabled={!editing}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#64748B", fontSize: "12px", marginBottom: "6px" }}>Gender</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#64748B", fontSize: "12px", marginBottom: "6px" }}>Date of Birth</label>
                    <input
                      type="date"
                      disabled={!editing}
                      value={profile.dob}
                      onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                      style={{ background: "#060B13", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COMMUNICATIONS SECTION */}
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#10B981", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "0.03em" }}>Communications Interface</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>Primary Phone Line</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>System Email Address</label>
                  <input
                    type="email"
                    disabled={!editing}
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
              </div>
            </div>

            {/* LOCATION CONFIGURATIONS */}
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F59E0B", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "0.03em" }}>Geographic Location Alignment</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>Station Quarters Address</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>City Precinct</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>State Sector</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={profile.state}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
              </div>
            </div>

            {/* SECURE GOVERNMENT IDENTITIES */}
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#EF4444", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "0.03em" }}>National Registries Authentication</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>Aadhaar Verification Number</label>
                  <input
                    disabled
                    value="[Aadhaar Record Omitted]"
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", color: "#475569", padding: "10px 14px", fontFamily: "monospace", opacity: 0.5, cursor: "not-allowed", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>PAN Identification Code</label>
                  <input
                    disabled
                    value="[PAN Code Redacted]"
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", color: "#475569", padding: "10px 14px", fontFamily: "monospace", opacity: 0.5, cursor: "not-allowed", outline: "none" }}
                  />
                </div>
              </div>
            </div>

            {/* EMERGENCY CONTACT INFORMATION */}
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#6366F1", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "0.03em" }}>Emergency Liaison Contact</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>Liaison Name</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={profile.emergencyName}
                    onChange={(e) => setProfile({ ...profile, emergencyName: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>Relationship Status</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={profile.emergencyRelation}
                    onChange={(e) => setProfile({ ...profile, emergencyRelation: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ color: "#64748B", fontSize: "12px", display: "block", marginBottom: "6px" }}>Secure Phone Line</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={profile.emergencyPhone}
                    onChange={(e) => setProfile({ ...profile, emergencyPhone: e.target.value })}
                    style={{ width: "100%", background: "#060B13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", padding: "10px 14px", outline: "none" }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}