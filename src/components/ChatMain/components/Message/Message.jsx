import React from 'react';
import { formatToColombianTime } from '../../../../utils/setDate';

const Message = ({ sender, content, timestamp }) => {
  const isUser = sender == 'user';

  const originalDate = new Date(timestamp);
  const hora = formatToColombianTime(originalDate);

  return (
    <div className={`flex mb-3 w-full ${!isUser ? 'justify-start' : 'justify-end'}`}>
      <div
        role="alert"
        className={`px-4 py-2 shadow-sm max-w-[75%] ${
          !isUser
            ? 'border border-gray-300 bg-white text-gray-700 dark:bg-slate-200  rounded-xl rounded-bl-none'
            : 'border border-gray-600 bg-gray-800 text-white rounded-xl rounded-br-none'
        }`}
      >
        <p className="text-sm">{content}</p>
        <p className={`text-[9px] pointer-events-none opacity-60 mt-1 ${isUser ? 'text-gray-300' : 'text-gray-500'} text-right`}>
          {hora}
        </p>
      </div>
    </div>
  );
};

export default Message;
