import type { WeatherUIToolInvocation } from '../api/weatherAgent/weather-tool';

export default function WeatherView({
  invocation,
}: {
  invocation: WeatherUIToolInvocation;
}) {
  
  // TODO: Remove this debug log in production
  console.log('WeatherView invocation:', invocation.state);

  switch (invocation.state) {
    // example of pre-rendering streaming tool calls:
    case 'input-streaming':
      return <pre>{JSON.stringify(invocation.input, null, 2)}</pre>;
    case 'input-available':
      return (
        <div key={invocation.input.city} className="text-blue-500">
          Getting weather information for {invocation.input.city}...
        </div>
      );
    case 'output-available':
      return (
        <div>
          <hr />
          {invocation.output.state === 'loading'
            ? 'Fetching weather information...'
            : <div className="text-orange-500">
              <img src={`https://openweathermap.org/img/wn/${invocation.output.icon}.png`} alt="weather icon" className="inline-block mr-2"/>
              <span>Weather in {invocation.input.city} is {invocation.output.weather}</span>
            </div>
          }
        </div>
      );
    case 'output-error':
      return <div className="text-red-500">Error: {invocation.errorText}</div>;
  }
}