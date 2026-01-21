import { UIToolInvocation, tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({

  description: 'Get the weather in a location',

  inputSchema: z.object({
    city: z.string(),
    latitude: z.string(),
    longitude: z.string()
  }),

  async *execute({ city, latitude, longitude }: {
    city: string, latitude: string, longitude: string
  }) {

    yield { state: 'loading' as const };

    const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

    let weather: string;
    let temperatureFarenheit: number;
    if (!OPEN_WEATHER_API_KEY) {

      // No API key, use mock data

      await new Promise(resolve => setTimeout(resolve, 2000)); // simulate network delay

      if (latitude === '40.7128') {         // New York
        weather = 'scorching';
        temperatureFarenheit = 95;
      } else if (latitude === '34.0522') {  // Los Angeles
        weather = 'foggy';
        temperatureFarenheit = 65;
      } else if (latitude === '41.8781') {  // Chicago
        weather = 'tsunami';
        temperatureFarenheit = 50;
      } else if (latitude === '37.7749') {  // San Francisco
        weather = 'hurricane';
        temperatureFarenheit = 55;
      } else {
        weather = 'sunny';                  // Default mock weather
        temperatureFarenheit = 75;
      }
    } else {
      // Real API call
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`
      );
      const data = await response.json();
      const weatherArray = data.weather;
      weather = weatherArray && weatherArray.length > 0 ? weatherArray[0].description : 'unknown';
      temperatureFarenheit = data.main ? data.main.temp : 0;
    }
    console.log(`Determined weather as ${weather} for city of ${city} at latitude ${latitude}`);

    yield {
      state: 'ready' as const,
      temperatureFarenheit: temperatureFarenheit,
      weather,
      city,
    };
  },
});

export type WeatherUIToolInvocation = UIToolInvocation<typeof weatherTool>;