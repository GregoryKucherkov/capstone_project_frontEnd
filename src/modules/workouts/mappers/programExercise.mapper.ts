import type {
  PlannedExerciseDraft,
  ProgramExerciseCreatePayload,
} from "@/shared/types/api";

export const mapDraftToProgramExercisePayload = (
  draft: PlannedExerciseDraft,
): ProgramExerciseCreatePayload => ({
  sets: Number(draft.sets) || 0,
  reps: String(draft.reps || ""),
  rest_seconds: Number(draft.rest) || 0,

  ...(draft.source === "library"
    ? { core_exercise_id: draft.exerciseId }
    : { custom_exercise_id: draft.exerciseId }),
});
