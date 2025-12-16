import { FloodRiskResult, FloodRiskLevel } from '../types/flood';

const FLOOD_PRONE_DISTRICTS = [
  'Nsanje',
  'Chikwawa',
  'Phalombe',
  'Mangochi',
  'Balaka',
  'Karonga'
];

export const assessFloodRisk = (
  area: string,
  rainfallMm: number
): FloodRiskResult => {

  let riskLevel: FloodRiskLevel = 'LOW';
  let reason = 'Normal conditions';

  if (rainfallMm > 50) {
    riskLevel = 'MEDIUM';
    reason = 'Heavy rainfall detected';
  }

  if (rainfallMm > 100) {
    riskLevel = 'HIGH';
    reason = 'Very heavy rainfall, flooding likely';
  }

  if (FLOOD_PRONE_DISTRICTS.includes(area) && rainfallMm > 120) {
    riskLevel = 'SEVERE';
    reason = 'Flood-prone district with extreme rainfall';
  }

  return {
    area,
    riskLevel,
    reason,
    timestamp: new Date()
  };
};
