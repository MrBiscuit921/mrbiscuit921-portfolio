import {fetchRepositories} from "@/lib/github";
import {
  Github,
  ArrowLeft,
  Calendar,
  Star,
  GitFork,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {notFound} from "next/navigation";

interface ProjectParams {
  slug: string;
}

interface ProjectPageProps {
  params: ProjectParams;
  searchParams?: {[key: string]: string | string[] | undefined};
}

export async function generateStaticParams(): Promise<ProjectParams[]> {
  const repos = await fetchRepositories("MrBiscuit921");
  return repos.map((repo) => ({
    slug: repo.name,
  }));
}

export default async function ProjectPage({params}: {params: ProjectParams}) {
  const {slug} = params;
  const repos = await fetchRepositories("MrBiscuit921");
  const repo = repos.find((r) => r.name === slug);

  if (!repo) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold">
            <span>MrBiscuit921</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/MrBiscuit921"
              target="_blank"
              rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                {repo.customTitle || repo.name}
              </h1>

              {repo.image && (
                <div className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden mb-8">
                  <Image
                    src={`/images/${repo.name}.png`}
                    alt={repo.customTitle || repo.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="space-y-8">
                <div className="bg-card rounded-lg p-6 border shadow-sm">
                  <h2 className="text-2xl font-bold tracking-tight mb-4 text-primary">
                    About this project
                  </h2>
                  <p className="text-lg text-card-foreground mb-4">
                    {repo.description}
                  </p>
                  {repo.detailedDescription && (
                    <p className="text-muted-foreground">
                      {repo.detailedDescription}
                    </p>
                  )}
                </div>

                <div className="bg-card rounded-lg p-6 border shadow-sm">
                  <h2 className="text-2xl font-bold tracking-tight mb-4 text-primary">
                    Features
                  </h2>
                  <p className="mb-4">Key features of this project include:</p>

                  <ul className="space-y-3">
                    {repo.name === "race-stint-calculator" && (
                      <>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Toggle between local and UTC timezone</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Inputs for race name and classes</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Dates input for qualifying and the race</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Input for length of the race</span>
                        </li>
                      </>
                    )}

                    {repo.name === "transition-flow" && (
                      <>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Share any 2 track transition on Spotify</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Find smooth transitions between songs</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Upvote and downvote other transitions</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Seamless Spotify API integration</span>
                        </li>
                      </>
                    )}

                    {repo.name === "timezone-to-image" && (
                      <>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Convert timezone data to shareable images</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Functional input design</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Support for multiple timezone formats</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>Easy sharing to social media</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Project Details</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Repository</span>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline flex items-center text-primary">
                      View on GitHub
                      <Github className="ml-1 h-4 w-4" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Stars</span>
                    <span className="font-medium flex items-center">
                      <Star className="mr-1 h-4 w-4 text-amber-500" />
                      {repo.stargazers_count}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Forks</span>
                    <span className="font-medium flex items-center">
                      <GitFork className="mr-1 h-4 w-4 text-blue-500" />
                      {repo.forks_count}
                    </span>
                  </div>

                  {repo.language && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Primary Language
                      </span>
                      <span className="font-medium">{repo.language}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {repo.topics?.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <Github className="mr-2 h-5 w-5" />
                View Source Code
              </Link>
              <Link
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <ExternalLink className="mr-2 h-5 w-5" />
                View Page
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MrBiscuit921. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/MrBiscuit921"
              target="_blank"
              rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
