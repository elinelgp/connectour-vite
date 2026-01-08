import { useState, useCallback, useEffect } from "react";
import { User, UserRole } from "../domain";
import { mockUsers } from "../mocks/data";

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;

  // Filtres
  findByEmail: (email: string) => User | undefined;
  findByRole: (role: UserRole) => User[];
  getArtists: () => User[];
  getVenueManagers: () => User[];
  getAdmins: () => User[];
  findById: (id: string) => User | undefined;

  refresh: () => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      setUsers([...mockUsers]);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // === FILTRES ===

  const findByEmail = useCallback((email: string) => {
    return users.find(u => u.email === email);
  }, [users]);

  const findByRole = useCallback((role: UserRole) => {
    return users.filter(u => u.role === role);
  }, [users]);

  const getArtists = useCallback(() => {
    return users.filter(u => u.isArtist());
  }, [users]);

  const getVenueManagers = useCallback(() => {
    return users.filter(u => u.isVenueManager());
  }, [users]);

  const getAdmins = useCallback(() => {
    return users.filter(u => u.isAdmin());
  }, [users]);

  const findById = useCallback((id: string) => {
    return users.find(u => u.id === id);
  }, [users]);

  return {
    users,
    loading,
    error,
    findByEmail,
    findByRole,
    getArtists,
    getVenueManagers,
    getAdmins,
    findById,
    refresh: loadUsers,
  };
}