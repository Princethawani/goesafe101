import { api } from './api';

export const assessFloodRisk = (area: string, rainfall: number) =>
  api(`/flood?area=${area}&rainfall=${rainfall}`);
