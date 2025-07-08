import { useConflictStore } from '../../stores/conflictStore';
import Step1Details from './Step1Details';
import Step2Invite from './Step2Invite';
import Step3Review from './Step3Review';
import { AnimatePresence, motion } from 'framer-motion';

const steps = [
  { id: 1, name: 'Details' },
  { id: 2, name: 'Invite' },
  { id: 3, name: 'Review' },
];

const ConflictWizard = () => {
  const { step } = useConflictStore();

  return (
    <div className="bg-surface border border-border rounded-xl p-4 sm:p-8 shadow-lg">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((s, stepIdx) => (
            <li key={s.name} className="relative flex-1">
              <div className="flex items-center text-sm font-medium">
                <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${step > s.id ? 'bg-primary' : step === s.id ? 'bg-primary border-2 border-background ring-2 ring-primary' : 'bg-border'}`}>
                  {step > s.id ? (
                     <svg className="h-5 w-5 text-background" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg>
                  ) : (
                    <span className={step === s.id ? 'text-background' : 'text-text-secondary'}>{s.id}</span>
                  )}
                </span>
                <span className={`ml-4 ${step === s.id ? 'text-text' : 'text-text-secondary'}`}>{s.name}</span>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div className="absolute inset-0 top-4 left-4 -z-10 h-0.5 w-full bg-gray-200" aria-hidden="true">
                  <div className="h-full bg-primary" style={{ width: step > s.id ? '100%' : '0%' }}></div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && <Step1Details />}
            {step === 2 && <Step2Invite />}
            {step === 3 && <Step3Review />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConflictWizard;
