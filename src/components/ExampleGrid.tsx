'use client';

export default function ExampleGrid() {
  // Placeholder avatar colors
  const examples = [
    { id: 1, color: 'from-pink-500 to-purple-500' },
    { id: 2, color: 'from-blue-500 to-cyan-500' },
    { id: 3, color: 'from-green-500 to-teal-500' },
    { id: 4, color: 'from-yellow-500 to-orange-500' },
    { id: 5, color: 'from-purple-500 to-pink-500' },
    { id: 6, color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            See What&apos;s <span className="gradient-text">Possible</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Every avatar is unique, just like you. Here are some examples of what our AI can create.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {examples.map((example) => (
            <div
              key={example.id}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-xl overflow-hidden glass transition-all duration-300 hover:scale-105 hover:glow-purple">
                <div className={`w-full h-full bg-gradient-to-br ${example.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                  {/* Placeholder pixel pattern */}
                  <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-[2px] p-2">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-black/20 rounded-sm"
                        style={{
                          opacity: Math.random() > 0.3 ? 1 : 0,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-zinc-400">
            And many more styles coming soon!
          </p>
        </div>
      </div>
    </section>
  );
}
