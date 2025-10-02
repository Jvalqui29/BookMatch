import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Send, User, Phone, Video } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.background};
`;

const Header = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
`;

const BackButton = styled.button`
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${theme.borderRadius.sm};
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.25);
  }
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
`;

const BookTitle = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.primary};
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.25);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div<{ $isOwn: boolean }>`
  display: flex;
  justify-content: ${props => props.$isOwn ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div<{ $isOwn: boolean }>`
  background: ${props => props.$isOwn ? theme.colors.primary : 'white'};
  color: ${props => props.$isOwn ? 'white' : theme.colors.text};
  padding: 0.75rem 1rem;
  border-radius: ${theme.borderRadius.lg};
  max-width: 70%;
  border-bottom-${props => props.$isOwn ? 'right' : 'left'}-radius: 0.25rem;
  box-shadow: ${theme.shadows.sm};
`;

const MessageTime = styled.div<{ $isOwn: boolean }>`
  font-size: 0.7rem;
  color: ${props => props.$isOwn ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary};
  margin-top: 0.25rem;
  text-align: ${props => props.$isOwn ? 'right' : 'left'};
`;

const InputContainer = styled.div`
  background: white;
  padding: 1rem;
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  min-height: 44px;
  max-height: 120px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.placeholder};
  }
`;

const SendButton = styled.button<{ $disabled: boolean }>`
  background: ${props => props.$disabled ? theme.colors.disabled : theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    transform: scale(1.05);
  }
`;

// Mock data
const mockMessages = [
  {
    id: '1',
    text: '¡Hola! Me interesa mucho tu libro "Cien años de soledad"',
    timestamp: '10:30',
    isOwn: false
  },
  {
    id: '2',
    text: '¡Hola! Claro, está disponible. ¿En qué estado está el tuyo?',
    timestamp: '10:32',
    isOwn: true
  },
  {
    id: '3',
    text: 'Está en muy buen estado, apenas tiene marcas de uso. ¿Podemos vernos para intercambiar?',
    timestamp: '10:35',
    isOwn: false
  },
  {
    id: '4',
    text: '¡Perfecto! ¿Nos vemos el sábado en el parque del Retiro?',
    timestamp: '10:40',
    isOwn: true
  },
  {
    id: '5',
    text: 'Me parece genial. ¿A qué hora te viene bien?',
    timestamp: '10:42',
    isOwn: false
  }
];

const mockUser = {
  name: 'María González',
  avatar: 'MG',
  book: 'Cien años de soledad'
};

const ChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [messages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aquí se enviaría el mensaje
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/chats')}>
          <ArrowLeft size={24} />
        </BackButton>
        
        <UserInfo>
          <Avatar>
            <User size={20} />
          </Avatar>
          <UserDetails>
            <UserName>{mockUser.name}</UserName>
            <BookTitle>{mockUser.book}</BookTitle>
          </UserDetails>
        </UserInfo>

        <ActionButtons>
          <ActionButton>
            <Phone size={20} />
          </ActionButton>
          <ActionButton>
            <Video size={20} />
          </ActionButton>
        </ActionButtons>
      </Header>

      <MessagesContainer>
        {messages.map((message) => (
          <Message key={message.id} $isOwn={message.isOwn}>
            <div>
              <MessageBubble $isOwn={message.isOwn}>
                {message.text}
              </MessageBubble>
              <MessageTime $isOwn={message.isOwn}>
                {message.timestamp}
              </MessageTime>
            </div>
          </Message>
        ))}
      </MessagesContainer>

      <InputContainer>
        <MessageInput
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
        />
        <SendButton
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          $disabled={!newMessage.trim()}
        >
          <Send size={20} />
        </SendButton>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;