import PomodoroTimer from "@/components/pomodoro/pomodoro-timer";
import TaskList from "@/components/pomodoro/task-list";

export default function PomodoroPage() {
  return (
    <>
      <section className='mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 p-4'>
        <PomodoroTimer />
        <TaskList />
      </section>
    </>
  );
}
