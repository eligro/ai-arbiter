import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { conflictsApi } from '../services/conflicts';
import { Conflict } from '../types/database';
import { PlusCircle, Scale, Users, Clock } from 'lucide-react';

const ConflictCard = ({ conflict }: { conflict: Conflict }) => (
  <motion.div
    className="p-6 bg-surface border border-border rounded-lg flex flex-col justify-between hover:border-primary/50 transition-colors"
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
  >
    <div>
      <h3 className="text-xl font-semibold text-text">{conflict.title}</h3>
      <p className="mt-2 text-text-secondary text-sm line-clamp-2">{conflict.description}</p>
    </div>
    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-text-secondary">
       <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 capitalize">
        {conflict.status}
      </span>
      <span>{new Date(conflict.created_at).toLocaleDateString()}</span>
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConflicts = async () => {
      try {
        setIsLoading(true);
        const userConflicts = await conflictsApi.getConflictsForUser();
        setConflicts(userConflicts);
      } catch (error) {
        console.error("Failed to fetch conflicts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConflicts();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-text">Dashboard</h1>
          <p className="mt-2 text-text-secondary">Welcome back, {user?.email}</p>
        </div>
        <Link
          to="/conflicts/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-background font-bold rounded-lg text-sm hover:bg-primary/90 transition-all transform hover:scale-105"
        >
          <PlusCircle size={18} />
          New Resolution
        </Link>
      </motion.div>

      <motion.div
        className="mt-10"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <h2 className="text-2xl font-semibold text-text mb-6">My Conflicts</h2>
        {isLoading ? (
          <p className="text-text-secondary">Loading conflicts...</p>
        ) : conflicts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conflicts.map((conflict) => (
              <ConflictCard key={conflict.id} conflict={conflict} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-surface border-2 border-dashed border-border rounded-lg">
            <Scale className="mx-auto h-12 w-12 text-text-secondary" />
            <h3 className="mt-4 text-lg font-semibold text-text">No Conflicts Yet</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Start a new resolution to see it here.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPage;
