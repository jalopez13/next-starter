import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const IndexPage = () => {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 border-b p-6 text-right">
        <ModeToggle />
      </div>
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-6xl">Index Page -</h1>
        <p>Let&apos;s get crackin!</p>
        <Button>Schad/cn Rocks!</Button>
      </div>
    </>
  );
};

export default IndexPage;
