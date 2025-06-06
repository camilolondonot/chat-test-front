import React, { useEffect, useState, useRef } from 'react';
import './ChatMain.sass';
import HeaderChat from './components/HeaderChat/HeaderChat';
import Message from './components/Message/Message';
import { getMessages, sendMessage, resetChatMessages } from '../../services';
import TappingMessage from './components/TappingMessage/TappingMessage';
import { formatDateToLocalString, getSeparatorText, fixTimestamp } from '../../utils/setDate'
import LoadingTapping from './components/LoadingTapping/LoadingTapping';
import LoadingDefault from '../Global/LoadingDefault/LoadingDefault';
import infoIcon from '../../assets/img/vector/info-icon.svg'

const ChatMain = () => {
  const [messages, setMessages] = useState([]);
  const [isWaittingResponse, setIsWaittingResponse] = useState(false)
  const [isError, setIsError] = useState('')
  const [isLoadingChat, setIsLoadingChat] = useState(true);
  const chatContentRef = useRef(null);

  const scrollToBottom = () => {
    const el = chatContentRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const getGroupedMessages = (messages) => {
    if (messages.length === 0) return [];
  
    let lastDateStr = null;
    const grouped = [];
  
    messages.forEach(msg => {
      const fixedDate = fixTimestamp(msg.timestamps); 
      const msgDateStr = formatDateToLocalString(fixedDate); 
  
      if (lastDateStr !== msgDateStr) {
        const separatorText = getSeparatorText(fixedDate); 
        grouped.push({ type: 'separator', text: separatorText });
        lastDateStr = msgDateStr;
      }
  
      grouped.push({
        ...msg,
        type: 'message',
        timestamps: fixedDate.toISOString(), 
      });
    });
  
    return grouped;
  };
  
  const resetChat = async () => {
    setIsLoadingChat(true);
    try {
      await resetChatMessages(); 
      setMessages([]); 
      fetchMessages();
    } catch (error) {
      console.error('Error al resetear el chat:', error);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const fetchMessages = async () => {
    setIsLoadingChat(true);
    try {
      const data = await getMessages();
      const transformedData = data.map(msg => ({
        ...msg,
        timestamps: msg.timestamps
      }));      
  
      const sortedMessages = [...transformedData].sort(
        (a, b) => new Date(a.timestamps) - new Date(b.timestamps)
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingChat(false);
    }
  };
  

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendMessage = async (text) => {
    setIsWaittingResponse(true)

    const userMessage = {
      content: text,
      sender: 'user',
      timestamps: new Date().toISOString(),
    };
  
    setMessages(prev => [...prev, userMessage]);
  
    try {
      const response = await sendMessage(text);
      const botMessage = {
        content: response.bot,
        sender: 'bot',
        timestamps: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botMessage]);
      if(response.bot){
        setIsWaittingResponse(false)
      }else{
        setIsError(true)
        setIsWaittingResponse(false)
      }
    } catch (error) {
      setIsWaittingResponse(false)
      setIsError(true)
      console.error('Error al enviar mensaje:', error);
    } finally {
      setIsWaittingResponse(false)
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const groupedMessages = getGroupedMessages(messages);

  return (
    <div className="chatMain flex items-center justify-center content-center w-screen p-4 bg-gray-100 dark:bg-slate-800">
      <div className="bg-white rounded-xl p-4 max-w-lg w-full dark:bg-slate-700">
        <HeaderChat resetChat={resetChat} />
        <div ref={chatContentRef} className="chat-content bg-slate-200 p-4 h-[400px] overflow-y-auto dark:bg-slate-500">
          {isLoadingChat ? (
            <LoadingDefault />
          ) : (
            <>
              {!isLoadingChat && groupedMessages.length === 0 && (
                <div className=" justify-center items-center h-full pointer-events-none">
                  <div className="text-gray-400 dark:text-gray-300 text-sm text-center">
                    No hay mensajes todavía... 
                  </div>
                  <div className='text-xl text-center font-bold text-slate-600 dark:text-slate-800'>¿por qué no escribís algo? 😄</div>
                </div>
              )}

              {groupedMessages.map((item, index) => {
                if (item.type === 'separator') {
                  return (
                    <div key={`sep-${index}`} className="separator flex justify-center my-3 pointer-events-none dark:opacity-50">
                      <span className="text-gray-500 dark:text-gray-300 text-[9px]">_________ {item.text} _________</span>
                    </div>
                  );
                } else {
                  return (
                    <Message
                      key={`msg-${index}`}
                      sender={item.sender}
                      content={item.content}
                      timestamp={item.timestamps}
                    />
                  );
                }
              })}
              {isError && (
                <div className="flex justify-start mb-3 pointer-events-none">
                  <div className="px-4 flex gap-2 py-2 border border-red-500 bg-red-100 text-red-700 rounded-xl rounded-bl-none max-w-[75%] shadow-sm text-sm">
                    <img src={infoIcon} alt="" />
                    <p className='text-xs'>Hubo un error al enviar el mensaje. Intenta de nuevo más tarde.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="relative">
          {isWaittingResponse && (
            <div className={`absolute transition-all top-[-25px] left-4 ${isWaittingResponse ? 'opacity-100' : 'opacity-0'}`}>
              <LoadingTapping />
            </div>
          )}
          <TappingMessage disabled={isWaittingResponse} onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatMain;