import PomodoroTimer from "@/components/tools/pomodoro/pomodoro-timer";
import TaskList from "@/components/tools/pomodoro/task-list";

export default function PomodoroTimerPage() {
  return (
    <section className='mx-auto w-full max-w-6xl'>
      <div className='flex flex-col items-center justify-center gap-6 px-4 py-16'>
        <PomodoroTimer />
        <TaskList />
      </div>
    </section>
  );
}
