import { FloodRiskResult, FloodRiskLevel } from '../types/flood';

const FLOOD_PRONE_DISTRICTS = [
  'NSANJE',
  'CHIKWAWA',
  'PHALOMBE',
  'MANGOCHI',
  'BALAKA',
  'KARONGA'
];

/**
 * Malawi flood risk assessment (simplified & realistic)
 */
export const assessFloodRisk = (
  area: string,
  rainfallMm: number
): FloodRiskResult => {

  const normalizedArea = area.toUpperCase();

  let riskLevel: FloodRiskLevel = 'LOW';
  let reason = 'Normal conditions';

  if (rainfallMm >= 30) {
    riskLevel = 'MODERATE';
    reason = 'Moderate rainfall detected';
  }

  if (rainfallMm >= 60) {
    riskLevel = 'HIGH';
    reason = 'Heavy rainfall, flooding possible';
  }

  if (
    FLOOD_PRONE_DISTRICTS.includes(normalizedArea) &&
    rainfallMm >= 100
  ) {
    riskLevel = 'SEVERE';
    reason = 'Flood-prone district with extreme rainfall';
  }

  return {
    area: normalizedArea,
    rainfall: rainfallMm,
    riskLevel,
    reason,
    timestamp: new Date()
  };
};
