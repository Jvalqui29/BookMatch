import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, MessageCircle, User, Clock } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.background};
`;

const Header = styled.div`
  background: white;
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textSecondary};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  background: ${theme.colors.background};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.placeholder};
  }
`;

const ChatsList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
  background: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.background};
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const UserName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
  flex: 1;
`;

const TimeStamp = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LastMessage = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookTitle = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.primary};
  background: ${theme.colors.primary}20;
  padding: 0.25rem 0.5rem;
  border-radius: ${theme.borderRadius.sm};
  margin-top: 0.25rem;
  display: inline-block;
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.textSecondary};
  padding: 2rem;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${theme.colors.textSecondary};
`;

// Mock data
const mockChats = [
  {
    id: '1',
    user: {
      name: 'María González',
      avatar: 'MG'
    },
    lastMessage: '¡Perfecto! ¿Nos vemos el sábado en el parque?',
    timestamp: '2 min',
    book: 'Cien años de soledad',
    unread: true
  },
  {
    id: '2',
    user: {
      name: 'Carlos Ruiz',
      avatar: 'CR'
    },
    lastMessage: 'El libro está en muy buenas condiciones',
    timestamp: '1h',
    book: 'El nombre del viento',
    unread: false
  },
  {
    id: '3',
    user: {
      name: 'Ana López',
      avatar: 'AL'
    },
    lastMessage: 'Gracias por el intercambio 📚',
    timestamp: 'Ayer',
    book: 'Sapiens',
    unread: false
  }
];

const ChatListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [chats] = useState(mockChats);

  const filteredChats = chats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <Container>
      <Header>
        <Title>Conversaciones</Title>
        <SearchContainer>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar conversaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <ChatsList>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatItem key={chat.id} onClick={() => handleChatClick(chat.id)}>
              <Avatar>
                <User size={24} />
              </Avatar>
              <ChatInfo>
                <ChatHeader>
                  <UserName>{chat.user.name}</UserName>
                  <TimeStamp>
                    <Clock size={12} />
                    {chat.timestamp}
                  </TimeStamp>
                </ChatHeader>
                <LastMessage>{chat.lastMessage}</LastMessage>
                <BookTitle>{chat.book}</BookTitle>
              </ChatInfo>
            </ChatItem>
          ))
        ) : searchQuery ? (
          <EmptyState>
            <EmptyIcon>
              <Search size={32} />
            </EmptyIcon>
            <h3>No se encontraron conversaciones</h3>
            <p>No hay conversaciones que coincidan con tu búsqueda</p>
          </EmptyState>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <MessageCircle size={32} />
            </EmptyIcon>
            <h3>No tienes conversaciones aún</h3>
            <p>Cuando hagas match con otros lectores, tus conversaciones aparecerán aquí</p>
          </EmptyState>
        )}
      </ChatsList>
    </Container>
  );
};

export default ChatListScreen;