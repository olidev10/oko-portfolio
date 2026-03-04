"use client"

import { useEffect, useMemo, useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type Project = {
  objectId?: string
  title: string
  description: string
  techStack: string[]
  github: string
  demo?: string
  video?: string
  imageUrl: string
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [project, setProject] = useState<Project>({ title: '', description: '', techStack: [], github: '', demo: '', video: '', imageUrl: '' })
  const [techText, setTechText] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingList, setLoadingList] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef(null)

  const imagePreview = useMemo(() => project.imageUrl || '', [project])

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoadingList(true)
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Failed to fetch projects')
        if (!mounted) return
        setProjects(Array.isArray(data) ? data : [])
      } catch (e: any) {
        if (!mounted) return
        setError(e?.message || 'Unexpected error')
      } finally {
        if (mounted) setLoadingList(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  function resetForm() {
    setSelectedId(null)
    setProject({ title: '', description: '', techStack: [], github: '', demo: '', video: '', imageUrl: '' })
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).value = ''
    }
    setTechText('')
    setError(null)
  }

  function onChange<K extends keyof Project>(key: K, value: Project[K]) {
    setProject(prev => ({ ...prev, [key]: value }))
  }

  function onSelect(p: Project) {
    setSelectedId(p.objectId || null)
    setProject({
      objectId: p.objectId,
      title: p.title || '',
      description: p.description || '',
      techStack: p.techStack || [],
      github: p.github || '',
      demo: p.demo || '',
      video: p.video || '',
      imageUrl: p.imageUrl || '/placeholder.svg',
    })
    setTechText((p.techStack || []).join(', '))
  }

  async function onUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Upload failed')
      onChange('imageUrl', data.url as string)
    } catch (e: any) {
      setError(e?.message || 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const payload: Project = {
      title: project.title?.trim(),
      description: project.description?.trim(),
      techStack: techText.split(',').map(s => s.trim()).filter(Boolean),
      github: project.github?.trim(),
      demo: project.demo?.trim(),
      video: project.video?.trim(),
      imageUrl: project.imageUrl?.trim() || '/placeholder.svg',
    }
    try {
      if (selectedId) {
        const res = await fetch(`/api/projects/${selectedId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Update failed')
      } else {
        const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Create failed')
      }
      // refresh list
      const list = await fetch('/api/projects', { cache: 'no-store' })
      const arr = await list.json()
      setProjects(Array.isArray(arr) ? arr : [])
      resetForm()
    } catch (e: any) {
      setError(e?.message || 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  async function onDelete(id?: string) {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Delete failed')
      const next = projects.filter(p => p.objectId !== id)
      setProjects(next)
      if (selectedId === id) resetForm()
    } catch (e: any) {
      setError(e?.message || 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{selectedId ? 'Modifier un projet' : 'Créer un projet'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" value={project.title || ''} onChange={e => onChange('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={project.description || ''} onChange={e => onChange('description', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tech">Technos (séparées par des virgules)</Label>
              <Input id="tech" value={techText} onChange={e => setTechText(e.target.value)} placeholder="Django, DRF, PostgreSQL" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" value={project.github || ''} onChange={e => onChange('github', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo">Demo</Label>
                <Input id="demo" value={project.demo || ''} onChange={e => onChange('demo', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="video">Video</Label>
                <Input id="video" value={project.video || ''} onChange={e => onChange('video', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" ref={fileInputRef} accept="image/*" onChange={onUploadImage} />
              </div>
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="max-h-48 border" />
            )}
            {error && <p className="text-red-600">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>{selectedId ? 'Enregistrer' : 'Créer'}</Button>
              <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>Nouveau</Button>
              {selectedId && (
                <Button type="button" variant="destructive" onClick={() => onDelete(selectedId!)} disabled={loading}>Supprimer</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projets existants</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingList ? (
            <p>Chargement...</p>
          ) : (
            <div className="space-y-2">
              {projects.length === 0 && <p>Aucun projet pour l'instant.</p>}
              {projects.map((p) => (
                <button
                  key={p.objectId}
                  onClick={() => onSelect(p)}
                  className={`w-full text-left p-3 border rounded hover:bg-slate-50 dark:hover:bg-sky-900/20 ${selectedId === p.objectId ? 'border-sky-500' : 'border-slate-200 dark:border-sky-800'}`}
                >
                  <div className="font-semibold">{p.title || 'Sans titre'}</div>
                  {/* <div className="text-sm text-slate-600 dark:text-slate-300 truncate">{p.description}</div> */}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


