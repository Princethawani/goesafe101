export type FloodRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'SEVERE';

export interface FloodRiskResult {
  area: string;           // District / TA / Location
  riskLevel: FloodRiskLevel;
  reason: string;
  timestamp: Date;
}
