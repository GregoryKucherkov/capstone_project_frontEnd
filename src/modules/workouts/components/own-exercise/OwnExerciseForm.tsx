import { exercisesService } from "@/modules/workouts/services/exercisesServise";
import type { OwnExercise } from "@/shared/types/api";
import { Button } from "@/shared/ui/button/Button";
import { Card } from "@/shared/ui/card/Card";
import { Typography } from "@/shared/ui/typography/Typography";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface OwnExerciseFormProps {
  onCreate: (exercise: OwnExercise) => void;
  children: React.ReactNode;
}

export const OwnExerciseForm = ({
  onCreate,
  children,
}: OwnExerciseFormProps) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    try {
      const newExercise = await exercisesService.createCustomExercise({
        title,
        muscle_group: muscleGroup,
        difficulty,
        description,
        media_url: "",
        calories_burn: 0,
      });

      onCreate({
        id: newExercise.id,
        user_id: newExercise.user_id,
        title: newExercise.title,
        muscle_group: newExercise.muscle_group ?? null,
        difficulty: newExercise.difficulty ?? null,
        description: newExercise.description ?? null,
        media_url: newExercise.media_url ?? null,
        calories_burn: newExercise.calories_burn ?? null,
        created_at: newExercise.created_at,
      });

      queryClient.invalidateQueries({
        queryKey: ["customExercises"],
        exact: false,
      });

      setTitle("");
      setMuscleGroup("");
      setDifficulty("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create exercise", err);
    }
  };

  return (
    <Card variant="small">
      <Typography variant="h4">Create your own exercise</Typography>

      <input
        type="text"
        placeholder="Exercise title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Muscle group"
        value={muscleGroup}
        onChange={(e) => setMuscleGroup(e.target.value)}
      />
      <input
        type="text"
        placeholder="Difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button onClick={handleCreate} style={{ marginTop: "12px" }}>
        Create Exercise
      </Button>
      {children}
    </Card>
  );
};
