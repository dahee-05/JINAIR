import React from 'react';
// 챗봇이 수행할 수 있는 다양한 액션(동작)을 정의하는 컴포넌트입니다

export default function ActionProvider({ createChatBotMessage, setState, children }) {
    const handleAirLine = () => {
        const botMessage = createChatBotMessage('아이디를 입력해주세요.');
    
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, botMessage]
        }));
      };
    
      const handleUnknownMessage = () => {
        const botMessage = createChatBotMessage('죄송해요 무슨 말씀이신지 잘 모르겠어요.');
    
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, botMessage]
        }));
      };
    
      return (
        <div>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              actions: { handleAirLine, handleUnknownMessage },
            });
          })}
        </div>
      );
}

