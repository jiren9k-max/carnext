"use client"

import { useState, useRef } from "react"
import { Upload, X, Loader2, FileVideo } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxFiles?: number
  type?: "image" | "video"
  value: string[]
  onChange: (urls: string[]) => void
}

export function FileUpload({
  accept,
  multiple = true,
  maxFiles = 20,
  type = "image",
  value,
  onChange,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const defaultAccept = type === "image" ? "image/*" : "video/*"

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return

    setUploading(true)
    const urls: string[] = []

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        const data = await res.json()
        if (data.url) urls.push(data.url)
      } catch {
        console.error("Upload failed:", file.name)
      }
    }

    onChange([...value, ...urls].slice(0, maxFiles))
    setUploading(false)
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  const Icon = type === "image" ? Upload : FileVideo

  return (
    <div className="space-y-3">
      <div className={cn("grid gap-2", type === "image" ? "grid-cols-3" : "grid-cols-1")}>
        {value.map((url, i) => (
          <div key={url} className="group relative">
            {type === "image" ? (
              <div className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                <img src={url} alt="" className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="size-3" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg border border-border/50 p-2 group">
                <FileVideo className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate text-small text-muted-foreground">{url.split("/").pop()}</span>
                <button type="button" onClick={() => remove(i)} className="text-destructive hover:text-destructive shrink-0">
                  <X className="size-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}

        {value.length < maxFiles && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "flex items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-50",
              type === "image" ? "aspect-square" : "w-full py-3 gap-2 text-small"
            )}
          >
            {uploading ? <Loader2 className="size-5 animate-spin" /> : <Icon className={type === "image" ? "size-5" : "size-4"} />}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept || defaultAccept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => { handleFiles(e.target.files); e.target.value = "" }}
      />
    </div>
  )
}
