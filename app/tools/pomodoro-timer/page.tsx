import PomodoroTimer from "@/components/tools/pomodoro/pomodoro-timer";
import TaskList from "@/components/tools/pomodoro/task-list";

export default function PomodoroTimerPage() {
  return (
    <section className='mx-auto w-full max-w-6xl px-4'>
      <div className='flex py-16 flex-col items-center justify-center gap-8'>
        <PomodoroTimer />
        <TaskList />
      </div>
    </section>
  );
}
