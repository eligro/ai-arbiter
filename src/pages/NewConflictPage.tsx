import { motion } from 'framer-motion';
import ConflictWizard from '../components/conflict/ConflictWizard';

const NewConflictPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-text text-center">Start a New Resolution</h1>
        <p className="mt-2 text-text-secondary text-center max-w-2xl mx-auto">
          Follow these steps to create a new conflict case. Provide clear details to help the arbiter understand the situation.
        </p>
      </motion.div>

      <div className="mt-12 max-w-3xl mx-auto">
        <ConflictWizard />
      </div>
    </div>
  );
};

export default NewConflictPage;
