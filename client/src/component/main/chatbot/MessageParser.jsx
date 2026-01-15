import React from 'react';
// 사용자의 입력을 해석하고 적절한 액션을 수행하는 로직을 포함합니다.
export default function MessageParser({ children, actions }) {
    const parse = (message) => {
        if (message.includes('1')) {
          actions.handleAirLine();
        } else {
          actions.handleUnknownMessage();
        }
      };
    
      return (
        <div>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              parse: parse,
              actions,
            });
          })}
        </div>
      );
}

