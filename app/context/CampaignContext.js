"use client";
import { createContext, useContext } from "react";

export const CampaignContext = createContext();

export const CampaignProvider = CampaignContext.Provider;

export default function useCampaign() {
  return useContext(CampaignContext);
}
