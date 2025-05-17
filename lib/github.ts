export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  language: string | null;
  updated_at: string;
  customTitle?: string;
  image?: string;
  detailedDescription?: string;
}

// Custom project data to override GitHub data
export const customProjectData: Record<string, Partial<Repository>> = {
  "race-stint-calculator": {
    customTitle: "Race Stint Calculator",
    image: "./images/race-stint-calculator.png",
    description:
      "A tool organising race stints for sim racing teams on discord",
    detailedDescription:
      "This application helps sim racing teams organise times and drivers for stints on endurance racing on discord.",
    topics: ["racing", "strategy", "calculator"],
    language: "TypeScript",
  },
  "transition-flow": {
    customTitle: "Spotify Transitions",
    image: "./images/transition-flow.png",
    description: "Find smooth transitions between songs on Spotify",
    detailedDescription:
      "This site is a place where users can share transitions they have found between songs on spotify",
    topics: ["spotify", "music", "api", "transitions"],
    language: "TypeScript",
  },
  "timezone-to-image": {
    customTitle: "Timezone to Image",
    image: "./images/timezone-to-image.png", // Changed to relative path
    description: "Convert timezone data into beautiful, shareable images",
    detailedDescription:
      "This utility converts timezone information into visually appealing, shareable images. Perfect for remote teams, travel planning, or anyone working across multiple timezones who needs to communicate time differences clearly.",
    topics: ["timezone", "image-generation", "utility"],
    language: "TypeScript",
  },
};

// Fallback data in case the GitHub API fails
const fallbackRepos: Repository[] = [
  {
    id: 1,
    name: "race-stint-calculator",
    description:
      "A tool organising race stints for sim racing teams on discord",
    html_url: "https://github.com/MrBiscuit921/race-stint-calculator",
    homepage: "https://race-stint-calculator.vercel.app",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["racing", "strategy", "calculator"],
    language: "TypeScript",
    updated_at: new Date().toISOString(),
    ...customProjectData["race-stint-calculator"],
  },
  {
    id: 2,
    name: "transition-flow",
    description:
      "Create smooth transitions between songs in your Spotify playlists",
    html_url: "https://github.com/MrBiscuit921/transition-flow",
    homepage: "https://transitionflow.vercel.app",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["spotify", "music", "api", "transitions"],
    language: "TypeScript",
    updated_at: new Date().toISOString(),
    ...customProjectData["transition-flow"],
  },
  {
    id: 3,
    name: "timezone-to-image",
    description: "Convert timezone data into beautiful, shareable images",
    html_url: "https://github.com/MrBiscuit921/timezone-to-image",
    homepage: "https://timezone-to-image.vercel.app",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["timezone", "image-generation", "utility"],
    language: "TypeScript",
    updated_at: new Date().toISOString(),
    ...customProjectData["timezone-to-image"],
  },
];

export async function fetchRepositories(
  username: string
): Promise<Repository[]> {
  try {
    // List of repositories we want to display
    const targetRepos = [
      "race-stint-calculator",
      "transition-flow",
      "timezone-to-image",
    ];

    // Try to fetch from GitHub API
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: {revalidate: 3600}, // Revalidate every hour
      }
    );

    // If the API request fails, use fallback data
    if (!response.ok) {
      console.warn(
        `GitHub API request failed with status ${response.status}. Using fallback data.`
      );
      return fallbackRepos;
    }

    const allRepos = await response.json();

    // Filter to only include the repositories we want
    const filteredRepos = allRepos.filter((repo: any) =>
      targetRepos.includes(repo.name)
    );

    // If we didn't find all the repos we're looking for, fill in the missing ones from fallback data
    const foundRepoNames = filteredRepos.map((repo: any) => repo.name);
    const missingRepos = fallbackRepos.filter(
      (repo) => !foundRepoNames.includes(repo.name)
    );

    const combinedRepos = [...filteredRepos, ...missingRepos];

    // Sort them in the order we specified
    const sortedRepos = combinedRepos.sort((a: any, b: any) => {
      return targetRepos.indexOf(a.name) - targetRepos.indexOf(b.name);
    });

    // Enhance repositories with custom data
    const enhancedRepos = sortedRepos.map((repo: any) => {
      const customData = customProjectData[repo.name] || {};
      return {...repo, ...customData};
    });

    return enhancedRepos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    // Return fallback data if anything goes wrong
    return fallbackRepos;
  }
}
