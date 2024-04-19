export default function Footer() {
  return (
    <main className="flex min-h-60 flex-col items-center justify-between">
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 Starter App. All Rights Reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
