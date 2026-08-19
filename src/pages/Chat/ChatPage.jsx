import React, { useEffect, useMemo, useState } from 'react';
import './Chat.css';
import ChatHeader from '../../components/chat/ChatHeader';
import AvatarCircle from '../../components/chat/AvatarCircle';
import ChatMessage from '../../components/chat/ChatMessage';
import { MessageInput } from '../../components/common/MessageInput';
import {
  getOrCreateChatRoom,
  loadChatMessages,
  saveChatMessage,
  sendChatMessage,
  ACTIVE_MEMORIAL_ID,
} from '../../util/chat';

const DEFAULT_ASSISTANT_NAME = '아무개';

function formatDate(timestamp) {
  if (!timestamp) {
    return '';
  }

  const date = new Date(timestamp);

  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const weekday = new Intl.DateTimeFormat('ko-KR', {
    weekday: 'short',
  }).format(date);

  return `${year}.${month}.${day}.(${weekday.replace('.', '')})`;
}

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [assistantName, setAssistantName] = useState(
    DEFAULT_ASSISTANT_NAME,
  );

  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Chat 페이지 진입 시:
   * 1. 현재 memorial의 chat room 확인/생성
   * 2. 기존 chat_messages 복원
   */
  useEffect(() => {
    let mounted = true;

    async function initializeChat() {
      setIsInitializing(true);
      setErrorMessage('');

      try {
        // RLS 제약으로 인해 getOrCreateChatRoom()은 room 객체만 반환
        // (memorial.name을 조회할 수 없음)
        const room = await getOrCreateChatRoom(ACTIVE_MEMORIAL_ID);

        if (!mounted) {
          return;
        }

        setChatRoomId(room.id);
        // room.title을 사용 (기본값 '아무개')
        setAssistantName(room.title || DEFAULT_ASSISTANT_NAME);

        const savedMessages = await loadChatMessages(room.id);

        if (!mounted) {
          return;
        }

        setMessages(savedMessages);
      } catch (error) {
        console.error('Chat initialization error:', error);

        if (mounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : '채팅을 불러오지 못했습니다.',
          );
        }
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    }

    initializeChat();

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * 메시지 전송
   */
  const handleSendMessage = async (message) => {
    if (!message.trim() || isLoading || !chatRoomId) {
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      // 1. 사용자 메시지를 DB에 먼저 저장
      const userMessage = await saveChatMessage(
        chatRoomId,
        'user',
        message,
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
      ]);

      // 2. 현재 OpenAI Edge Function 호출
      const response = await sendChatMessage(
        message,
        chatRoomId,
      );

      // 3. AI 응답도 DB에 저장
      const assistantMessage = await saveChatMessage(
        chatRoomId,
        'assistant',
        response,
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error('Chat response error:', error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'AI 응답을 가져오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const groupedMessages = useMemo(() => {
    return messages.map((message, index) => {
      const previousMessage = messages[index - 1];

      return {
        ...message,
        isFirstInGroup:
          !previousMessage || previousMessage.role !== message.role,
      };
    });
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="chat-page-header">
        <ChatHeader
          title={
            messages.length === 0
              ? 'Dear'
              : assistantName || DEFAULT_ASSISTANT_NAME
          }
        />
      </div>

      <div className="chat-page-content">
        {isInitializing ? (
          <div className="chat-loading-state">
            대화를 불러오는 중...
          </div>
        ) : messages.length === 0 ? (
          <AvatarCircle />
        ) : (
          <div className="chat-messages-container">
            <div className="chat-date-divider">
              <span className="chat-date-text">
                {formatDate(messages[0]?.timestamp)}
              </span>
            </div>

            <div className="chat-messages">
              {groupedMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isFirstMessage={message.isFirstInGroup}
                  assistantName={
                    assistantName || DEFAULT_ASSISTANT_NAME
                  }
                />
              ))}
            </div>

            {errorMessage && (
              <div className="chat-error-message" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        )}

        {!isInitializing &&
          messages.length === 0 &&
          errorMessage && (
            <div className="chat-error-message" role="alert">
              {errorMessage}
            </div>
          )}
      </div>

      <div className="chat-page-bottom">
        <MessageInput
          onSend={handleSendMessage}
          disabled={isInitializing || isLoading}
        />
      </div>
    </div>
  );
}

export default ChatPage;