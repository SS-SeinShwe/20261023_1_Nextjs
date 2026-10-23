type Post = {
  id: number;
  title: string;
  body: string;
};

async function page() {
  let posts: Post[] = [];

  try {
    const res = await fetch("http://localhost:3001/posts", {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      throw new Error(`Failed to load posts: ${res.status}`);
    }

    const data = await res.json();
    posts = Array.isArray(data) ? data : [];
  } catch {
    posts = [];
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),linear-gradient(135deg,#020817_0%,#0f172a_40%,#111827_100%)] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:py-16">
        <header className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
                Community feed
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Fresh ideas, stories, and updates
              </h1>
            </div>

            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-4 text-left shadow-lg shadow-cyan-900/20">
              <div className="text-3xl font-bold text-cyan-300">
                {posts.length}
              </div>
              <div className="text-sm text-slate-300">posts available</div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-900"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
                    Post #{post.id}
                  </span>
                  <span className="text-xs text-slate-400 transition group-hover:text-cyan-300">
                    Read more →
                  </span>
                </div>

                <h2 className="mb-3 text-xl font-semibold text-white md:text-2xl">
                  {post.title}
                </h2>
                <p className="line-clamp-5 text-sm leading-7 text-slate-300">
                  {post.body}
                </p>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
              <p className="text-lg font-medium text-slate-200">
                No posts are available right now.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Check back later or start the local posts API to populate this
                feed.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default page;
