import { PlanExerciseForm } from "@/modules/workouts/components/plan-workout/PlanExerciseForm";
import type { PlannedExerciseDraft } from "@/shared/types/api";
import { Modal } from "@/shared/ui/modal/Modal";

interface PlanExerciseModalProps {
  isOpenModal: boolean;
  closeModal: () => void;
  exercise: PlannedExerciseDraft;
  onChange: (updated: PlannedExerciseDraft) => void;
  onSave: () => void;
  children: React.ReactNode;
}

export const PlanExerciseModal = ({
  isOpenModal,
  closeModal,
  exercise,
  onChange,
  children,
}: PlanExerciseModalProps) => {
  return (
    <Modal isOpen={isOpenModal} closeModal={closeModal}>
      <PlanExerciseForm exercise={exercise} onChange={onChange} />
      {children}
    </Modal>
  );
};
