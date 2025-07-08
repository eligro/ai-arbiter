import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useConflictStore } from '../../stores/conflictStore';
import { motion } from 'framer-motion';

const detailsSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters long.'),
  description: z.string().min(25, 'Description must be at least 25 characters long.'),
});

type DetailsFormData = z.infer<typeof detailsSchema>;

const Step1Details = () => {
  const { title, description, setDetails, nextStep } = useConflictStore();
  const { register, handleSubmit, formState: { errors } } = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { title, description },
  });

  const onSubmit = (data: DetailsFormData) => {
    setDetails(data.title, data.description);
    nextStep();
  };

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text-secondary">Conflict Title</label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="mt-1 block w-full bg-surface border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="e.g., Dispute over project deliverables"
        />
        {errors.title && <p className="mt-2 text-sm text-error">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-secondary">Description</label>
        <textarea
          id="description"
          rows={5}
          {...register('description')}
          className="mt-1 block w-full bg-surface border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="Briefly describe the situation, the parties involved, and what you hope to achieve."
        />
        {errors.description && <p className="mt-2 text-sm text-error">{errors.description.message}</p>}
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-6 py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors">
          Next
        </button>
      </div>
    </motion.form>
  );
};

export default Step1Details;
