import BackButton from "@/components/back-button";
import ThemeSelector from "@/components/theme-toggle";
import PomodoroTimer from "@/components/focus/pomodoro-timer";
import TaskList from "@/components/focus/task-list";
import { YouTubePlayer } from "@/components/focus/youtube-player";
import { Card } from "@/components/ui/card";

export default function FocusPage() {
  return (
    <>
      <nav className='flex items-center justify-between p-4'>
        <BackButton />
        <h1 className='font-bold sm:text-2xl'>FOCUS JAMS</h1>
        <ThemeSelector />
      </nav>
      <section className='mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 p-4'>
        <Card>
          <PomodoroTimer />
          <YouTubePlayer />
        </Card>
        <TaskList />
      </section>
    </>
  );
}
