'use client';

import { useChat } from '@ai-sdk/react';
import ChatInput from '../../components/chat-input';
import type { WeatherAgentUIMessage } from '../../api/weatherAgent/weather-agent';
import WeatherView from '../../components/weather-view';
import { DefaultChatTransport } from 'ai';

export default function WeatherAgent() {
  const { status, sendMessage, messages, stop } =
    useChat<WeatherAgentUIMessage>
    (
      {
        transport: new DefaultChatTransport({
          api: '/api/weatherAgent',
        }),
      }
    );

  return (
    <>
      <link rel="stylesheet" href="/chatUi.css" />
      <div className="chat-messages" id="chatMessages">
        <div className="message bot">
          {messages?.map(message => (
            <div key={message.id} className="message-content">
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

        </div>
      </div>
        <div className="chat-input">
          <ChatInput status={status} onSubmit={text => sendMessage({ text })} stop={stop} />
        </div>
    </>
  );
}