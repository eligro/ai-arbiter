import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useConflictStore } from '../../stores/conflictStore';
import { motion } from 'framer-motion';

const inviteSchema = z.object({
  inviteeEmail: z.string().email('Please enter a valid email address.'),
});

type InviteFormData = z.infer<typeof inviteSchema>;

const Step2Invite = () => {
  const { inviteeEmail, setInvitee, nextStep, prevStep } = useConflictStore();
  const { register, handleSubmit, formState: { errors } } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { inviteeEmail },
  });

  const onSubmit = (data: InviteFormData) => {
    setInvitee(data.inviteeEmail);
    nextStep();
  };

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="inviteeEmail" className="block text-sm font-medium text-text-secondary">
          Invite Participant
        </label>
        <p className="text-xs text-text-secondary mb-2">Enter the email of the other person involved in this conflict.</p>
        <input
          id="inviteeEmail"
          type="email"
          {...register('inviteeEmail')}
          className="mt-1 block w-full bg-surface border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="participant@example.com"
        />
        {errors.inviteeEmail && <p className="mt-2 text-sm text-error">{errors.inviteeEmail.message}</p>}
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={prevStep} className="px-6 py-2 bg-surface border border-border text-text font-bold rounded-lg hover:bg-border/50 transition-colors">
          Back
        </button>
        <button type="submit" className="px-6 py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors">
          Next
        </button>
      </div>
    </motion.form>
  );
};

export default Step2Invite;
