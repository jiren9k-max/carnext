"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Eye, Pencil } from "lucide-react"
import type { BlogPost } from "@/data/admin"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    fetch("/api/blog").then((r) => r.json()).then(setPosts)
  }, [])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h3 text-foreground">Blog</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">Upravljajte blog postovima.</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/blog/new"><Plus className="size-4" /> Novi post</Link>
        </Button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/admin/blog/${post.id}/edit`}
            className="group flex items-start justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/20"
          >
            <div className="min-w-0 flex-1">
              <h3 className="text-h6 text-foreground">{post.title}</h3>
              <p className="mt-1 text-body-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-3 flex items-center gap-4 text-small text-muted-foreground">
                <span>{post.author}</span>
                <span>{post.date}</span>
                {post.status === "published" && (
                  <span className="flex items-center gap-1"><Eye className="size-3" /> {post.views}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <Badge variant={post.status === "published" ? "success" : "secondary"} size="sm">
                {post.status === "published" ? "Objavljeno" : "Skica"}
              </Badge>
              <Pencil className="size-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
