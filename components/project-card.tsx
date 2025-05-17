import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Github, Star, GitFork, ExternalLink} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type {Repository} from "@/lib/github";

interface ProjectCardProps {
  repo: Repository;
}

export default function ProjectCard({repo}: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full">
      {repo.image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={repo.image || "/placeholder.svg"}
            alt={repo.customTitle || repo.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            unoptimized
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <Link
          href={repo.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-medium hover:underline flex items-center text-primary">
          {repo.customTitle}
        </Link>
        <CardDescription className="line-clamp-2 h-10">
          {repo.description || "No description provided"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics?.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="secondary">
              {topic}
            </Badge>
          ))}
          {repo.language && (
            <Badge variant="outline" className="bg-primary/10">
              {repo.language}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex gap-2">
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Github className="mr-2 h-4 w-4" />
          View Code
        </Link>
        <Link
          href={`/projects/${repo.name}`}
          className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <ExternalLink className="mr-2 h-4 w-4" />
          Details
        </Link>
      </CardFooter>
    </Card>
  );
}
