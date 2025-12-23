export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between px-6 py-10">
      
      {/* Hero */}
      <section className="text-center mt-16">
        <h1 className="text-4xl font-bold mb-4">
          Web3 Protocol Template
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto">
          A starter template for building Web3 protocols using Next.js and Tailwind CSS.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto mt-16 grid gap-10 text-center">
        
        <div>
          <h2 className="text-xl font-semibold mb-2">What’s included</h2>
          <ul className="text-gray-600 space-y-1">
            <li>• Next.js App Router setup</li>
            <li>• Tailwind CSS for styling</li>
            <li>• Basic metadata and SEO ready</li>
            <li>• Clean structure for extension</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Next steps</h2>
          <ul className="text-gray-600 space-y-1">
            <li>• Fork this repository</li>
            <li>• Add your protocol logic</li>
            <li>• Connect smart contracts</li>
            <li>• Customize the UI as needed</li>
          </ul>
        </div>

      </section>

      {/* Footer */}
      <footer className="mt-20 border-t pt-6 text-center text-sm text-gray-500">
        <p>
          Built with ❤️ by{" "}
          <a
            href="https://stability.nexus"
            target="_blank"
            className="underline"
          >
            Stability Nexus
          </a>
        </p>

        <div className="mt-2 flex justify-center gap-4">
          <a href="https://twitter.com/StabilityNexus" target="_blank">
            Twitter
          </a>
          <a href="https://github.com/StabilityNexus" target="_blank">
            GitHub
          </a>
        </div>
      </footer>

    </main>
  );
}
