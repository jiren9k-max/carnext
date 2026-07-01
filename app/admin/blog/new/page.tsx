"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, InputLabel } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)
    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, status, author: "Husein Holjan" }),
    })
    router.push("/admin/blog")
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-h3 text-foreground">Novi blog post</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">Kreirajte novi blog post.</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <div className="space-y-4">
            <div>
              <InputLabel>Naslov</InputLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Unesite naslov posta" />
            </div>
            <div>
              <InputLabel>Kratki opis</InputLabel>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="Kratki opis posta"
                className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-ring/70 focus:ring-3 focus:ring-ring/20 resize-none"
              />
            </div>
            <div>
              <InputLabel>Sadržaj</InputLabel>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="Unesite sadržaj blog posta..."
                className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-ring/70 focus:ring-3 focus:ring-ring/20 resize-y min-h-[200px]"
              />
            </div>
            <div>
              <InputLabel>Status</InputLabel>
              <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Skica</SelectItem>
                  <SelectItem value="published">Objavljeno</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving || !title.trim()} className="gap-2">
            <Save className="size-4" /> {saving ? "Spremanje..." : "Sačuvaj"}
          </Button>
          <Button variant="outline" onClick={() => router.back()}>Odustani</Button>
        </div>
      </div>
    </div>
  )
}
