import { UIToolInvocation, tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get the weather in a location',
  inputSchema: z.object({ city: z.string(), latitude: z.string(), longitude: z.string() }),
  // async *execute({ city }: { city: string }) {
  async *execute({ city, latitude, longitude }: {
    city: string, latitude: string, longitude: string }) {
    yield { state: 'loading' as const };

    // TODO: Remove this debug log in production
    console.log(`In weatherTool, fetching weather for ${latitude}, ${longitude}`);

    // Add artificial delay of 5 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    let weather = 'blizzard';             // default
    let temperature = 30;                 // default
    if (latitude === '40.7128') {         // New York
      weather = 'scorching';
      temperature = 95;
    } else if (latitude === '34.0522') {  // Los Angeles
      weather = 'foggy';
      temperature = 65;
    } else if (latitude === '41.8781') {  // Chicago
      weather = 'tsunami';
      temperature = 50;
    } else if (latitude === '37.7749') {  //
      weather = 'hurricane';
      temperature = 55;
    }
    console.log(`Determined weather as ${weather} for city of ${city} at latitude ${latitude}`);

    yield {
      state: 'ready' as const,
      temperature,
      weather,
      city,
    };
  },
});

export type WeatherUIToolInvocation = UIToolInvocation<typeof weatherTool>;