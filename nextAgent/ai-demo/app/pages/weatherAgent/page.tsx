'use client';

import { useChat } from '@ai-sdk/react';
import ChatInput from '../../components/chat-input';
import type { WeatherAgentUIMessage } from '../../api/weatherAgent/weather-agent';
import WeatherView from '../../components/weather-view';
import { DefaultChatTransport } from 'ai';

export default function WeatherAgent() {
  const { status, sendMessage, messages } = useChat<WeatherAgentUIMessage>
  (
    {
    transport: new DefaultChatTransport({
      api: '/api/weatherAgent',
    }),
  }
);

  return (
    <div className="flex flex-col py-24 mx-auto w-full max-w-md stretch">
      {messages?.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          <strong>{`${message.role}: `}</strong>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case 'text':
                return <div key={index}>{part.text}</div>;

              case 'step-start':
                return index > 0 ? (
                  <div key={index} className="text-gray-500">
                    <hr className="my-2 border-gray-300" />
                  </div>
                ) : null;

              case 'tool-weather': {
                return <WeatherView key={index} invocation={part} />;
              }
            }
          })}
          <br />
        </div>
      ))}

      <ChatInput status={status} onSubmit={text => sendMessage({ text })} />
    </div>
  );
}