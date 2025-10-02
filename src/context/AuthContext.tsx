import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  favoriteGenres: string[];
  booksOwned: Book[];
  booksWanted: Book[];
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  isPremium: boolean;
  createdAt: Date;
}

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverImage?: string;
  description?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  isAvailable: boolean;
  status?: 'reading' | 'available' | 'not-available';
  forExchange?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  verifyPhone: (phone: string, code: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  sendVerificationCode: (phone: string) => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  favoriteGenres: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (userData: User) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos de ejemplo para desarrollo
      const mockUser: User = {
        id: '1',
        name: 'Usuario Demo',
        email,
        phone: '+1234567890',
        avatar: 'https://via.placeholder.com/150',
        coverImage: '',
        bio: 'Amante de los libros y las historias',
        favoriteGenres: ['Ficción', 'Misterio', 'Romance'],
        booksOwned: [],
        booksWanted: [],
        isPremium: false,
        createdAt: new Date(),
      };

      await saveUser(mockUser);
      toast.success('¡Bienvenido a BookMatch!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('No se pudo iniciar sesión');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        coverImage: '',
        favoriteGenres: userData.favoriteGenres,
        booksOwned: [],
        booksWanted: [],
        isPremium: false,
        createdAt: new Date(),
      };

      await saveUser(newUser);
      toast.success('¡Cuenta creada exitosamente!');
      return true;
    } catch (error) {
      console.error('Register error:', error);
      toast.error('No se pudo crear la cuenta');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationCode = async (phone: string): Promise<boolean> => {
    try {
      // Simular envío de código SMS
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En producción, aquí se integraría con un servicio como Twilio
      console.log(`Código enviado a ${phone}: 123456`);
      
      toast.success(
        'Se ha enviado un código de verificación a tu teléfono. Para desarrollo, usa: 123456',
        { duration: 6000 }
      );
      
      return true;
    } catch (error) {
      console.error('Send verification code error:', error);
      toast.error('No se pudo enviar el código de verificación');
      return false;
    }
  };

  const verifyPhone = async (phone: string, code: string): Promise<boolean> => {
    try {
      // Simular verificación de código
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En desarrollo, aceptar código 123456
      if (code === '123456') {
        toast.success('Teléfono verificado correctamente');
        return true;
      }
      
      toast.error('Código de verificación inválido');
      return false;
    } catch (error) {
      console.error('Verify phone error:', error);
      toast.error('No se pudo verificar el código');
      return false;
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    try {
      if (user) {
        const updatedUser = { ...user, ...userData };
        await saveUser(updatedUser);
        toast.success('Perfil actualizado correctamente');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('No se pudo actualizar el perfil');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    verifyPhone,
    logout,
    updateProfile,
    sendVerificationCode,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

