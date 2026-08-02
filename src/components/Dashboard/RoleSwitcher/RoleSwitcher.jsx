"use client";

import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ROLES, ROLE_LABELS, ROLE_COLORS } from "@/config/roles";
import useCurrentUser from "@/hooks/useCurrentUser";

// Only meaningful while the app runs on mock data (user.source === "dev").
// Lets you preview the Admin, Agent, Support, and Customer dashboards
// instantly — handy for a walkthrough, and it disappears on its own the
// moment a real token is present.
export default function RoleSwitcher() {
  const { user, setDevRole } = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);

  if (!user || user.source !== "dev") return null;

  return (
    <>
      <Tooltip title="Preview as a different role (demo only)">
        <button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <SwapHorizIcon sx={{ fontSize: 16 }} />
          Preview role
        </button>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        {Object.values(ROLES).map((role) => (
          <MenuItem
            key={role}
            onClick={() => {
              setDevRole(role);
              setAnchorEl(null);
            }}
            selected={role === user.role}
          >
            <ListItemIcon>
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                style={{ backgroundColor: ROLE_COLORS[role].bg, color: ROLE_COLORS[role].fg }}
              >
                {ROLE_LABELS[role][0]}
              </span>
            </ListItemIcon>
            {ROLE_LABELS[role]}
            {role === user.role && <CheckIcon sx={{ fontSize: 16, ml: "auto", color: "#2095ae" }} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
