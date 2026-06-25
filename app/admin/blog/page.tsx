"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Eye } from "lucide-react"
import { blogPosts } from "@/data/admin"

export default function BlogPage() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h3 text-foreground">Blog</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">Upravljajte blog postovima.</p>
        </div>
        <Button className="gap-2"><Plus className="size-4" /> Novi post</Button>
      </div>

      <div className="space-y-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="flex items-start justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/20">
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
            <Badge variant={post.status === "published" ? "success" : "secondary"} size="sm" className="shrink-0 ml-4">
              {post.status === "published" ? "Objavljeno" : "Skica"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
