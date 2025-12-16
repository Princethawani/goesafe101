import axios from 'axios';

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY!;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch rainfall in mm for last 1 hour
 */
export const getRainfallMm = async (area: string): Promise<number> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: `${area},MW`, // Malawi
        appid: WEATHER_API_KEY
      }
    });

    const rain = response.data?.rain?.['1h'] ?? 0;
    return rain;
  } catch (error) {
    console.error(`Weather fetch failed for ${area}`, error);
    return 0;
  }
};
