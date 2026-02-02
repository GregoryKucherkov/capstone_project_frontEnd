import Container from "@/shared/ui/container/Container";
import css from "./ManageWorkouts.module.css";
import { Card } from "@/shared/ui/card/Card";
import { useState } from "react";
import { MyDatePicker } from "@/shared/ui/date-picker/DatePicker";
import { Typography } from "@/shared/ui/typography/Typography";
import { useCreateProgramDay } from "@/modules/workouts/hooks/useCreateProgramDay";
import { Button } from "@/shared/ui/button/Button";
import { OwnExerciseForm } from "@/modules/workouts/components/own-exercise/OwnExerciseForm";
import type { ExerciseCommon, PlannedExerciseDraft } from "@/shared/types/api";
import { ExercisesCategories } from "@/modules/exercises/components/exercises-categories/ExercisesCategories";
import { useExercises } from "@/modules/exercises/hooks/useExercises";
import Loader from "@/shared/ui/loader/Loader";
import { ExercisesList } from "@/modules/exercises/components/exercises-list/ExercisesList";
import { PlanExerciseModal } from "@/modules/workouts/components/PlanExerciseModal/PlanExerciseModal";
import { ListOwnExe } from "@/modules/workouts/components/list-own-exercises/ListOwnExe";
import { useCustomExercises } from "@/modules/workouts/hooks/useCustomExercises";
import { ReviewWorkout } from "@/modules/workouts/components/review-workout/ReviewWorkout";
import { useScheduleWorkoutFlow } from "@/modules/workouts/hooks/useScheduleWorkout";
import { Input } from "@/shared/ui/input/Input";

export const ManageWorkouts = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dayTitle, setDayTitle] = useState<string>("");

  const [activeDayId, setActiveDayId] = useState<number | null>(null);

  const [showCustomExerciseForm, setShowCustomExerciseForm] = useState(false);

  const [modalExercise, setModalExercise] =
    useState<PlannedExerciseDraft | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // for custom exercises lib
  const [customList, setShowCustomList] = useState(false);
  const [customPage, setCustomPage] = useState(1);
  const size = 5;
  const skip = (customPage - 1) * size;

  const {
    data: custoExe,
    isLoading: isLoadingCustom,
    isError: isErrorCustom,
  } = useCustomExercises(skip, size);

  const { scheduleWorkout, isPending: isScheduling } = useScheduleWorkoutFlow();

  // for library option
  const customTotalPages = custoExe ? Math.ceil(custoExe.total / size) : 0;
  const [showLibraryForm, setShowLibraryForm] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useExercises(search, page);

  const [review, setReview] = useState(false);
  const [exercises, setExercises] = useState<PlannedExerciseDraft[]>([]);

  const { mutateAsync: createDay, isPending } = useCreateProgramDay();

  const handleDay = async () => {
    if (!selectedDate) return;

    try {
      const result = await createDay({
        scheduled_for: selectedDate.toISOString(),
        title: dayTitle,
      });

      setActiveDayId(result.id);
    } catch (error) {
      console.error("Failed to initialize workout day", error);
    }
  };

  const handleAddFromLibrary = (
    exercise: ExerciseCommon,
    source: "user" | "library",
  ) => {
    console.log("Incoming data from list:", exercise);

    setModalExercise({
      tempId: crypto.randomUUID(),
      exerciseId: exercise.id,
      source,

      title: exercise.title,
      media_url: exercise.media_url,
      calories_burn: exercise.calories_burn,
      muscle_group: exercise.muscle_group,
      description: exercise.description,

      sets: "",
      reps: "",
      weight: "",
      rest: "",
    });

    setIsModalOpen(true);
  };

  const handleModalChange = (updated: PlannedExerciseDraft) => {
    setModalExercise(updated);
  };

  const handleModalSave = () => {
    if (modalExercise) {
      setExercises((prev) => [...prev, modalExercise]);
      setModalExercise(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteExercise = (tempId: string) => {
    setExercises((prev) => prev.filter((ex) => ex.tempId !== tempId));
  };

  const handleSchedule = async () => {
    if (!activeDayId || !selectedDate) return;

    await scheduleWorkout({
      dayId: activeDayId,
      exercises, //PlannedExerciseDraft[]
      scheduledFor: selectedDate,
    });
  };

  return (
    <Container className={css.container}>
      <Typography variant="h1" className={css.title}>
        Plan your next workout!
      </Typography>

      {/* STEP 1: Pick a date */}
      <Card variant="default" className={css.dateCard}>
        <MyDatePicker
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date);
          }}
        />
      </Card>

      {/* STEP 2: Name the workout day */}
      <Card variant="pink" className={css.programDayCard}>
        <Typography variant="h2" className={css.subTitle}>
          Name your workout
        </Typography>
        <Input
          className={css.inputWktDys}
          type="text"
          placeholder="Workout name"
          value={dayTitle}
          onChange={(e) => setDayTitle(e.target.value)}
        />

        <Button
          onClick={handleDay}
          disabled={isPending || !selectedDate}
          variant="pink"
          className={css.dayCreateBtn}
        >
          {isPending
            ? "Creating..."
            : activeDayId
              ? "Day Saved"
              : "Next: Add Exercises"}
        </Button>
      </Card>

      {/* STEP 3: Exercises */}
      <Card variant="yellow" className={css.exerciseCard}>
        <Typography variant="h2" className={css.subTitle}>
          Choose your exercises
        </Typography>

        {/* Button to create custom exercise */}

        <Button
          disabled={!activeDayId}
          onClick={() => {
            setShowCustomExerciseForm(true);
            setShowCustomList(false);
            setShowLibraryForm(false);
          }}
          className={css.exerciseBtn}
        >
          Create your own exercises
        </Button>

        {showCustomExerciseForm && (
          <OwnExerciseForm
            onCreate={(newEx) => {
              const newDraft: PlannedExerciseDraft = {
                tempId: crypto.randomUUID(),
                exerciseId: newEx.id,
                source: "user",

                title: newEx.title,
                muscle_group: newEx.muscle_group || null,
                difficulty: newEx.difficulty || null,
                description: newEx.description || null,
                media_url: newEx.media_url || null,
                calories_burn: newEx.calories_burn || 0,

                sets: "",
                reps: "",
                rest: "",
                weight: "",
              };

              setModalExercise(newDraft);
              setIsModalOpen(true);
              setShowCustomExerciseForm(false);
            }}
          >
            <Button
              onClick={() => setShowCustomExerciseForm(false)}
              className={css.cancelBtn}
            >
              Cancel
            </Button>
          </OwnExerciseForm>
        )}

        <Button
          disabled={!activeDayId}
          onClick={() => {
            setShowCustomList(true);
            setShowCustomExerciseForm(false);
            setShowLibraryForm(false);
          }}
          className={css.exerciseBtn}
        >
          Choose from your exercises
        </Button>
        {customList && (
          <>
            {isLoadingCustom && <Loader />}
            {isErrorCustom && <p>Failed to load exercises</p>}
            {custoExe && (
              <ListOwnExe
                exercises={custoExe.exercises}
                totalPages={customTotalPages}
                currentPage={customPage}
                onPageChange={setCustomPage}
                onAdd={(ex) => handleAddFromLibrary(ex, "user")}
              />
            )}
          </>
        )}

        <Button
          disabled={!activeDayId}
          onClick={() => {
            setShowLibraryForm(true);
            setShowCustomExerciseForm(false);
            setShowCustomList(false);
          }}
          className={css.exerciseBtn}
        >
          Choose from library
        </Button>
        {showLibraryForm && (
          <ExercisesCategories
            searchValue={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onSearchSubmit={(e) => {
              e.preventDefault();
              setPage(1);
            }}
          />
        )}
        {showLibraryForm && (
          <>
            {isLoading && <Loader />}
            {isError && <p>Failed to load exercises</p>}
            {data && (
              <ExercisesList
                exercises={data.exercises}
                totalPages={data.total}
                currentPage={page}
                onAdd={(ex) => handleAddFromLibrary(ex, "library")}
              />
            )}
          </>
        )}

        {modalExercise && (
          <PlanExerciseModal
            isOpenModal={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            exercise={modalExercise}
            onChange={handleModalChange}
            onSave={handleModalSave}
          >
            <div className={css.modalBtnWrapper}>
              <Button
                onClick={handleModalSave}
                className={css.modalExerciseSaveBtn}
              >
                Save Exercise
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                className={css.modalExerciseCancelBtn}
              >
                Cancel
              </Button>
            </div>
          </PlanExerciseModal>
        )}
      </Card>

      {/* STEP 4: review and schedule */}
      <Card variant="green" className={css.checkoutCard}>
        <Typography variant="h2" className={css.subTitle}>
          Checkout
        </Typography>
        <Button
          style={{ border: "1px solid yellow" }}
          onClick={() => {
            setReview(true);
          }}
        >
          Check your workout
        </Button>
        {review && (
          <ReviewWorkout workout={exercises} onDelete={handleDeleteExercise} />
        )}
        <Button
          style={{ border: "1px solid green" }}
          onClick={handleSchedule}
          disabled={isScheduling || exercises.length === 0}
        >
          {isScheduling ? "Scheduling..." : "Schedule"}
        </Button>
      </Card>
      <Button
        style={{ border: "1px solid red" }}
        className={css.cancelButton}
        onClick={() => {
          setExercises([]);
          setReview(false);
        }}
      >
        Cancel
      </Button>
    </Container>
  );
};
