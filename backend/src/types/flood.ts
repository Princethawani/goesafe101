export type FloodRiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';

export interface FloodRiskResult {
  area: string;
  rainfall: number;
  riskLevel: FloodRiskLevel;
  reason: string;
  timestamp: Date;
}
