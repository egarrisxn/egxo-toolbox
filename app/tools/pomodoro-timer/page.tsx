import PomodoroTimer from "@/components/tools/pomodoro/pomodoro-timer";
import TaskList from "@/components/tools/pomodoro/task-list";

export default function PomodoroTimerPage() {
  return (
    <>
      <section className='mx-auto grid grid-cols-1 place-items-center px-4 py-16'>
        <PomodoroTimer />
        <TaskList />
      </section>
    </>
  );
}
