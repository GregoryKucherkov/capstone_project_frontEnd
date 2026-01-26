import Container from "@/shared/ui/container/Container";
import css from "./ManageWorkouts.module.css";
import { Card } from "@/shared/ui/card/Card";
import { useState } from "react";
import { MyDatePicker } from "@/shared/ui/date-picker/DatePicker";
import { Typography } from "@/shared/ui/typography/Typography";
import { useCreateProgramDay } from "@/modules/workouts/hooks/useCreateProgramDay";
import { Button } from "@/shared/ui/button/Button";
import { OwnExerciseForm } from "@/modules/workouts/components/own-exercise/OwnExerciseForm";
import { type PlannedExerciseForm } from "@/modules/workouts/components/plan-workout/PlanExerciseForm";
import { ExercisesCategories } from "@/modules/exercises/components/exercises-categories/ExercisesCategories";
import { useExercises } from "@/modules/exercises/hooks/useExercises";
import Loader from "@/shared/ui/loader/Loader";
import { ExercisesList } from "@/modules/exercises/components/exercises-list/ExercisesList";
import { PlanExerciseModal } from "@/modules/workouts/components/PlanExerciseModal/PlanExerciseModal";
import { ListOwnExe } from "@/modules/workouts/components/list-own-exercises/ListOwnExe";
import { useCustomExercises } from "@/modules/workouts/hooks/useCustomExercises";
import { ReviewWorkout } from "@/modules/workouts/components/review-workout/ReviewWorkout";




export const ManageWorkouts = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dayTitle, setDayTitle] = useState<string>("");

  const [activeDayId, setActiveDayId] = useState<number | null>(null);

  const [showCustomExerciseForm, setShowCustomExerciseForm] = useState(false);

  const [modalExercise, setModalExercise] = useState<PlannedExerciseForm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // for custom exercises lib
  const [customList, setShowCustomList] = useState(false)
  const [customPage, setCustomPage] = useState(1);
  const size = 2;
  const skip = (customPage - 1) * size;


  const {data: custoExe, isLoading: isLoadingCustom, isError: isErrorCustom } = useCustomExercises(skip, size)

  // for library option
  const customTotalPages = custoExe ? Math.ceil(custoExe.total / size) : 0;
  const [showLibraryForm, setShowLibraryForm] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useExercises(
      search,
      page,
    );
  

  const [review, setReview] = useState(false)
  const [exercises, setExercises] = useState<PlannedExerciseForm[]>([]);



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

  // const handleExerciseChange = (idx: number, updated: PlannedExerciseForm) => {
  //   setExercises(prev => prev.map((ex, i) => (i === idx ? updated : ex)));
  // };

  // const handleRemoveExercise = (idx: number) => {
  //   setExercises(prev => prev.filter((_, i) => i !== idx));
  // };

  const handleAddFromLibrary = (exercise: { id: number; title: string }) => {
    setModalExercise({
      id: exercise.id,
      title: exercise.title,
      sets: "",
      reps: "",
      rest: "",
    });

    setIsModalOpen(true);
  };

  const handleModalChange = (updated: PlannedExerciseForm) => {
    setModalExercise(updated);
  };

  const handleModalSave = () => {
    if (modalExercise) {
      setExercises(prev => [...prev, modalExercise]);
      setModalExercise(null);
      setIsModalOpen(false);
    }
  };

  

  return (
    <Container className={css.container}>
      <Typography variant="h1" className={css.title}>Plan your next workout!</Typography>

      {/* STEP 1: Pick a date */}
      <Card variant = "default" className={css.dateCard}>
        <MyDatePicker
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date);

          }}
        />
      </Card>

      {/* STEP 2: Name the workout day */}
      <Card variant="default" className={css.programDayCard}>
        <Typography variant="h3">Step 2: Name your workout days</Typography>
        <input
          className={css.inputWktDys}
          type="text"
          placeholder="Workout name"
          value={dayTitle}
          onChange={(e) => setDayTitle(e.target.value)}
        />

        <button 
          onClick={handleDay} 
          disabled={isPending || !selectedDate}
          style={{ marginTop: '20px', padding: '12px 24px' }}
          className={css.dayCreateBtn}
        >
          {isPending ? "Creating..." : activeDayId ? "Day Saved" : "Next: Add Exercises"}
        </button>
      </Card>

      {/* STEP 3: Exercises */}
      <Card>
        <Typography>Choose your exercises</Typography>

        {/* Button to create custom exercise */}
        <Card variant="small">
          <Button disabled={!activeDayId} onClick={() => {
            setShowCustomExerciseForm(true);
            setShowCustomList(false);
            setShowLibraryForm(false);
            }} style={{ border: '1px solid red' }}>Create your own exercises</Button>


          {showCustomExerciseForm && (
            <OwnExerciseForm
              onCreate={(newEx) => {
                setExercises(prev => [
                  ...prev, 
                  {id: newEx.id, 
                    title: newEx.title,
                  sets: 0,
                  reps: 0,
                  rest: 0,
                }]);
                setIsModalOpen(true); 
                setShowCustomExerciseForm(false);
                
              }}
            >
              <Button onClick={() => setShowCustomExerciseForm(false)} style={{ marginTop: "12px" }}>
            Cancel
          </Button>
            </OwnExerciseForm>
          )}

          <Button disabled={!activeDayId} onClick={() => {
            setShowCustomList(true);
            setShowCustomExerciseForm(false);
            setShowLibraryForm(false);
            }} style={{ border: '1px solid red' }}
            >Choose from your exercises</Button>
          {customList && (
            <>
              {isLoadingCustom && <Loader/>}
              {isErrorCustom && <p>Failed to load exercises</p>}
              {custoExe && (
                <ListOwnExe
                  exercises={custoExe.exercises}
                  totalPages={customTotalPages}
                  currentPage={customPage}
                  onPageChange={setCustomPage}
                  onAdd={handleAddFromLibrary}
                />
              )}
            </>
          )}

          <Button disabled={!activeDayId} onClick={() => {
            setShowLibraryForm(true);
            setShowCustomExerciseForm(false);
            setShowCustomList(false);
            }} style={{ border: '1px solid red' }}>Choose from library</Button>
          {showLibraryForm && (
            <ExercisesCategories 
              searchValue={search} 
              onSearchChange={(value) => {
                setSearch(value);
                setPage(1)
              }}
            onSearchSubmit={(e) => {
              e.preventDefault();
              setPage(1);
            }}
            />
          )}
          {showLibraryForm && (
            <>
            {isLoading && <Loader/>}
            {isError && <p>Failed to load exercises</p>}
            {data && (
              <ExercisesList
                exercises={data.exercises}
                totalPages={data.total}
                currentPage={page}
                onAdd={handleAddFromLibrary}
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
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <Button onClick={handleModalSave}>Save Exercise</Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </div>
            </PlanExerciseModal>
          )}
        </Card>
      </Card>
    
    {/* STEP 4: review and schedule */}
      <Card>
          <Typography variant="h4">Checkout</Typography>
          <Button style={{ border: '1px solid red' }} onClick={() => {setReview(true)}}>Check your workout</Button>
          {review &&  (
            <ReviewWorkout workout={exercises}/>
          )}
          <Button style={{ border: '1px solid red' }}>Schedule</Button>
        </Card>
    </Container>
  );

};
