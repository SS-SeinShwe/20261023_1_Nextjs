import React, { Suspense } from "react";

async function PostsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>PostsPage {id}</div>
    </Suspense>
  );
}

export default PostsPage;
