// components/CurrencyLanguageSelect.js
"use client";
import * as React from "react";
import { MenuItem, Select, FormControl, Box } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LanguageIcon from "@mui/icons-material/Language";

const CurrencyLanguageSelect = () => {
  const [currency, setCurrency] = React.useState("USD");
  const [language, setLanguage] = React.useState("English");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box className="flex items-center space-x-4">
      <FormControl variant="standard" size="small" className="min-w-[120px]">
        <Select
          value={currency}
          onChange={handleCurrencyChange}
          displayEmpty
          renderValue={(selected) => (
            <Box className="flex items-center space-x-1 text-white text-sm">
              <AttachMoneyIcon />
              <span>{selected}</span>
            </Box>
          )}
        >
          <MenuItem value="USD">USD ($)</MenuItem>
          <MenuItem value="EUR">EUR (€)</MenuItem>
          <MenuItem value="BDT">BDT (৳)</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" size="small" className="min-w-[120px]">
        <Select
          value={language}
          onChange={handleLanguageChange}
          displayEmpty
          renderValue={(selected) => (
            <Box className="flex items-center space-x-1 text-white border-none uppercase text-sm">
              <LanguageIcon />
              <span>{selected}</span>
            </Box>
          )}
        >
          <MenuItem value="English">
            <Box className="flex items-center space-x-1">
              
              <span>English</span>
            </Box>
          </MenuItem>
          <MenuItem value="Français">
            <Box className="flex items-center space-x-1">
             
              <span>Français</span>
            </Box>
          </MenuItem>
          <MenuItem value="Español">
            <Box className="flex items-center space-x-1">
             
              <span>Español</span>
            </Box>
          </MenuItem>
          <MenuItem value="Italiano">
            <Box className="flex items-center space-x-1">
             
              <span>Italiano</span>
            </Box>
          </MenuItem>
          <MenuItem value="English-UK">
            <Box className="flex items-center space-x-1">
             
              <span>English (UK)</span>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CurrencyLanguageSelect;
