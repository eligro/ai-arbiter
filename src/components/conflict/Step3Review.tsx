import { useConflictStore } from '../../stores/conflictStore';
import { motion } from 'framer-motion';
import { conflictsApi } from '../../services/conflicts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Step3Review = () => {
  const { title, description, inviteeEmail, prevStep, reset } = useConflictStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading('Submitting your case...');
    try {
      await conflictsApi.createConflictAndInvite({
        title,
        description,
        inviteeEmail,
      });
      toast.success('Conflict created successfully!', { id: toastId });
      reset();
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || 'An unexpected error occurred.';
      toast.error(errorMessage, { id: toastId });
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-text">Conflict Title</h3>
          <p className="mt-1 text-text-secondary p-3 bg-background rounded-md">{title}</p>
        </div>
        <div>
          <h3 className="font-medium text-text">Description</h3>
          <p className="mt-1 text-text-secondary p-3 bg-background rounded-md whitespace-pre-wrap">{description}</p>
        </div>
        <div>
          <h3 className="font-medium text-text">Invited Participant</h3>
          <p className="mt-1 text-text-secondary p-3 bg-background rounded-md">{inviteeEmail}</p>
        </div>
      </div>
      <div className="flex justify-between pt-6 border-t border-border">
        <button onClick={prevStep} disabled={isSubmitting} className="px-6 py-2 bg-surface border border-border text-text font-bold rounded-lg hover:bg-border/50 transition-colors disabled:opacity-50">
          Back
        </button>
        <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Submitting...' : 'Submit Case'}
        </button>
      </div>
    </motion.div>
  );
};

export default Step3Review;
