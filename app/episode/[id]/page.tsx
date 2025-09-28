"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ThumbsUp, ThumbsDown, Clock, ArrowLeft, Send, User } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Footer from "@/components/footer"

// Mock data for episodes (same as home page)
const episodes = [
  {
    id: 1,
    title: "The DVD",
    description: "Gumball and Darwin try to rent a DVD but encounter unexpected obstacles.",
    fullDescription:
      "When Gumball and Darwin decide to rent a DVD for a movie night, they discover that the simple task becomes an epic adventure filled with bureaucratic nightmares, mysterious store policies, and unexpected challenges. This episode showcases the absurd world of Elmore where even the most mundane activities can turn into extraordinary adventures. The boys learn valuable lessons about patience, persistence, and the importance of reading the fine print.",
    duration: "11:30",
    thumbnail: "/gumball-dvd-cartoon.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    title: "The Responsible",
    description: "Gumball tries to prove he's responsible enough to have a pet.",
    fullDescription:
      "Gumball desperately wants a pet and tries to convince his parents that he's responsible enough to take care of one. Through a series of hilarious attempts to demonstrate his maturity and reliability, Gumball learns what it truly means to be responsible. The episode features creative scenarios where Gumball's good intentions often lead to chaotic results, teaching viewers about the importance of genuine responsibility versus just appearing responsible.",
    duration: "11:45",
    thumbnail: "/gumball-responsible-episode.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 3,
    title: "The Third",
    description: "A new student arrives and disrupts Gumball and Darwin's friendship.",
    fullDescription:
      "When a new student named Tobias arrives at Elmore Junior High, Gumball becomes jealous of the attention Darwin gives him. The episode explores themes of friendship, jealousy, and insecurity as Gumball tries various schemes to win back Darwin's attention. Through comedic mishaps and heartfelt moments, the boys learn that true friendship can withstand new relationships and that there's room for more than two friends in their circle.",
    duration: "11:20",
    thumbnail: "/gumball-third-episode.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    title: "The Debt",
    description: "Gumball owes Darwin a favor and tries to repay it.",
    fullDescription:
      "After Darwin saves Gumball from embarrassment, Gumball feels indebted to his best friend and becomes obsessed with repaying the favor. His increasingly elaborate attempts to help Darwin backfire spectacularly, creating more problems than solutions. The episode humorously examines the nature of friendship and how sometimes the best way to help a friend is simply to be there for them, rather than trying to orchestrate grand gestures.",
    duration: "11:35",
    thumbnail: "/gumball-debt-scene.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 5,
    title: "The End",
    description: "The world seems to be ending, but is it really?",
    fullDescription:
      "When Gumball and Darwin misinterpret a news report, they become convinced that the world is ending. Their panic spreads throughout Elmore, causing mass hysteria and chaos. As the family prepares for the apocalypse, they discover the importance of spending quality time together and not taking life for granted. The episode combines comedy with touching family moments while satirizing media sensationalism and how misinformation can spread.",
    duration: "11:40",
    thumbnail: "/gumball-end-episode.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 6,
    title: "The Dress",
    description: "Gumball has to wear a dress to school.",
    fullDescription:
      "When all of Gumball's clothes are in the wash, he's forced to wear one of his mother's dresses to school. Initially embarrassed, Gumball discovers that his new look attracts positive attention from his classmates. The episode tackles themes of gender expression, self-confidence, and challenging social norms with humor and heart. Gumball learns that being true to yourself is more important than conforming to others' expectations.",
    duration: "11:25",
    thumbnail: "/gumball-dress-episode.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 7,
    title: "The Quest",
    description: "Gumball goes on an epic quest to find Anais's lost doll.",
    fullDescription:
      "When Anais loses her beloved doll Daisy, Gumball and Darwin embark on an epic quest through Elmore to find it. Their journey takes them through various locations and challenges, meeting colorful characters along the way. The episode parodies classic adventure stories and video games while showcasing the lengths the brothers will go to help their sister. It's a heartwarming tale about family bonds and determination.",
    duration: "11:50",
    thumbnail: "/gumball-quest.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    id: 8,
    title: "The Spoon",
    description: "A simple spoon causes chaos in the Watterson household.",
    fullDescription:
      "A seemingly innocent spoon becomes the center of a family-wide conflict when everyone wants to use it. What starts as a minor disagreement escalates into an all-out war, with each family member developing increasingly elaborate strategies to claim the spoon. The episode is a brilliant satire of how small disputes can spiral out of control and how material possessions can sometimes overshadow what's truly important in family relationships.",
    duration: "11:30",
    thumbnail: "/gumball-spoon-episode.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: 9,
    title: "The Pressure",
    description: "Gumball feels pressured to get his first kiss.",
    fullDescription:
      "When Gumball's classmates start talking about their first kisses, he feels left out and pressured to have his own romantic experience. His attempts to find someone to kiss lead to awkward encounters and misunderstandings. The episode sensitively handles the topic of peer pressure and growing up, showing that everyone develops at their own pace and that there's no need to rush important milestones in life.",
    duration: "11:45",
    thumbnail: "/gumball-pressure.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
  {
    id: 10,
    title: "The Painting",
    description: "The family discovers a valuable painting in their house.",
    fullDescription:
      "When the Wattersons discover what appears to be a valuable painting in their attic, they become convinced they're about to become rich. Their excitement leads to wild spending sprees and grand plans for their newfound wealth. However, they soon learn that things aren't always what they seem, and the episode delivers a lesson about the dangers of counting your chickens before they hatch, while also exploring themes of materialism and family values.",
    duration: "11:35",
    thumbnail: "/gumball-painting.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: 11,
    title: "The Laziest",
    description: "Gumball and Darwin compete to see who is the laziest.",
    fullDescription:
      "When Gumball and Darwin argue about who is lazier, they decide to settle it with a competition to see who can be the most inactive. Their contest escalates to ridiculous extremes as they try to out-lazy each other, leading to increasingly absurd situations. The episode humorously explores the concept of laziness while showing that sometimes a little competition can motivate people to achieve unexpected things, even if those things involve doing absolutely nothing.",
    duration: "11:40",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Laziest",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  },
  {
    id: 12,
    title: "The Ghost",
    description: "Carrie the ghost tries to possess Gumball.",
    fullDescription:
      "When Carrie, the school's resident ghost, becomes fascinated with experiencing life as a living being, she attempts to possess Gumball. The possession leads to hilarious situations as Carrie struggles to control Gumball's body while he tries to regain control. The episode explores themes of identity, empathy, and what it means to be alive, while delivering plenty of supernatural comedy and showcasing the unique friendship between the living and the undead.",
    duration: "11:30",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Ghost",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
  {
    id: 13,
    title: "The Mystery",
    description: "Someone has been leaving messes around the school.",
    fullDescription:
      "When mysterious messes start appearing around Elmore Junior High, Gumball and Darwin take it upon themselves to solve the case. Their investigation leads them through various suspects and red herrings, parodying classic detective stories. As they dig deeper into the mystery, they discover that the truth is more complex than they initially thought, and the episode teaches lessons about jumping to conclusions and the importance of looking at situations from multiple perspectives.",
    duration: "11:45",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Mystery",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  },
  {
    id: 14,
    title: "The Prank",
    description: "Gumball and Darwin's prank goes too far.",
    fullDescription:
      "What starts as a harmless prank between Gumball and Darwin quickly escalates into an all-out prank war that affects the entire school. As their pranks become more elaborate and potentially dangerous, they learn about the consequences of their actions and the importance of knowing when to stop. The episode balances comedy with a meaningful message about responsibility, friendship, and how fun activities can sometimes cross the line into harmful behavior.",
    duration: "11:25",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Prank",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 15,
    title: "The Gi",
    description: "Gumball learns martial arts to impress a girl.",
    fullDescription:
      "When Gumball develops a crush on a girl who's into martial arts, he decides to learn karate to impress her. His training montage and attempts at mastering martial arts lead to comedic failures and misunderstandings. The episode parodies martial arts movies and training sequences while exploring themes of authenticity, self-improvement, and the lengths people go to impress others. Gumball ultimately learns that being genuine is more attractive than pretending to be someone you're not.",
    duration: "11:50",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Gi",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 16,
    title: "The Kiss",
    description: "Gumball accidentally kisses his grandmother.",
    fullDescription:
      "In a case of mistaken identity and poor lighting, Gumball accidentally kisses his grandmother thinking she's someone else. The traumatic experience haunts him as he tries to process what happened while dealing with his family's reactions. The episode uses dark humor to explore awkward family situations and the psychological impact of embarrassing moments. It's a cringe-comedy masterpiece that shows how sometimes the most innocent mistakes can feel like the end of the world.",
    duration: "11:35",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Kiss",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 17,
    title: "The Party",
    description: "The kids throw a party while their parents are away.",
    fullDescription:
      "When Nicole and Richard go out for the evening, Gumball, Darwin, and Anais decide to throw a small party. However, word spreads quickly, and their intimate gathering turns into a massive house party with half the school showing up. As chaos ensues and the house gets trashed, the kids must figure out how to clean up before their parents return. The episode captures the classic 'party gets out of hand' scenario with the show's signature humor and heart.",
    duration: "11:40",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Party",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 18,
    title: "The Refund",
    description: "Gumball tries to return a defective product.",
    fullDescription:
      "When Gumball buys a defective toy with his allowance money, he embarks on a quest to get a refund. His journey through customer service hell involves dealing with unhelpful store employees, confusing return policies, and bureaucratic nightmares. The episode satirizes consumer culture and the frustrating experience of trying to return products, while showing Gumball's determination to fight for what's right, even when the system seems designed to defeat him.",
    duration: "11:30",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Refund",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 19,
    title: "The Robot",
    description: "Gumball builds a robot to do his chores.",
    fullDescription:
      "Tired of doing household chores, Gumball decides to build a robot to handle all his responsibilities. Initially, the robot works perfectly, giving Gumball more free time than he knows what to do with. However, the robot begins to malfunction and becomes increasingly aggressive, turning the house into a war zone. The episode parodies sci-fi robot uprising stories while teaching lessons about the value of hard work and the dangers of trying to avoid responsibility.",
    duration: "11:45",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Robot",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 20,
    title: "The Picnic",
    description: "The family goes on a disastrous picnic.",
    fullDescription:
      "The Watterson family decides to have a peaceful picnic in the park, but everything that can go wrong does go wrong. From weather disasters to wildlife encounters, their simple family outing becomes an epic survival adventure. Despite all the chaos and mishaps, the family discovers that sometimes the best memories come from the worst situations, and that being together is what really matters. It's a perfect season finale that celebrates family bonds through comedy and chaos.",
    duration: "11:55",
    thumbnail: "/placeholder.svg?height=400&width=600&text=The+Picnic",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
]

interface Comment {
  id: string
  name: string
  content: string
  timestamp: string
}

export default function EpisodePage() {
  const params = useParams()
  const episodeId = Number.parseInt(params.id as string)
  const episode = episodes.find((ep) => ep.id === episodeId)

  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLikes = localStorage.getItem(`episode-${episodeId}-likes`)
      const savedDislikes = localStorage.getItem(`episode-${episodeId}-dislikes`)
      const savedVote = localStorage.getItem(`episode-${episodeId}-user-vote`)
      const savedComments = localStorage.getItem(`episode-${episodeId}-comments`)

      if (savedLikes) setLikes(Number.parseInt(savedLikes))
      if (savedDislikes) setDislikes(Number.parseInt(savedDislikes))
      if (savedVote) setUserVote(savedVote as "like" | "dislike")
      if (savedComments) setComments(JSON.parse(savedComments))
    }
  }, [episodeId])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`episode-${episodeId}-likes`, likes.toString())
      localStorage.setItem(`episode-${episodeId}-dislikes`, dislikes.toString())
      if (userVote) {
        localStorage.setItem(`episode-${episodeId}-user-vote`, userVote)
      }
      localStorage.setItem(`episode-${episodeId}-comments`, JSON.stringify(comments))
    }
  }, [likes, dislikes, userVote, comments, episodeId])

  const handleLike = () => {
    if (userVote === "like") {
      setLikes(likes - 1)
      setUserVote(null)
    } else {
      if (userVote === "dislike") {
        setDislikes(dislikes - 1)
      }
      setLikes(likes + 1)
      setUserVote("like")
    }
  }

  const handleDislike = () => {
    if (userVote === "dislike") {
      setDislikes(dislikes - 1)
      setUserVote(null)
    } else {
      if (userVote === "like") {
        setLikes(likes - 1)
      }
      setDislikes(dislikes + 1)
      setUserVote("dislike")
    }
  }

  const handleAddComment = () => {
    if (newComment.trim() && userName.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        name: userName.trim(),
        content: newComment.trim(),
        timestamp: new Date().toLocaleString(),
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  if (!episode) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black">
        <Card className="text-white bg-white/10 border-white/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Episode Not Found</h2>
            <p className="mb-4">The episode you're looking for doesn't exist.</p>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      {/* Header */}
      <header className="px-4 border-b border-white/10 bg-black/20 backdrop-blur-sm md:px-20">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white transition-colors hover:text-purple-300">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Episodes</span>
            </Link>
            <h1 className="text-xl font-bold text-white">Gumball Stream</h1>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 mx-auto md:px-20">
        {/* Video Player Section */}
        <div className="mb-8">
          <div className="relative mb-4 overflow-hidden bg-black shadow-2xl aspect-video rounded-xl">
            <video
              className="w-full h-full"
              controls
              preload="metadata"
              poster={episode.thumbnail}>
              <source
                src={episode.videoUrl}
                type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white">{episode.title}</h1>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-white bg-purple-600">
                  <Clock className="w-3 h-3 mr-1" />
                  {episode.duration}
                </Badge>
                <Badge variant="outline" className="text-white border-white/30">
                  Episode {episode.id}
                </Badge>
              </div>
            </div>

            {/* Like/Dislike Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant={userVote === "like" ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className={`${userVote === "like"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-white/30 text-white hover:bg-white/10"
                  } bg-transparent border cursor-pointer`}
              >
                <ThumbsUp
                  className="w-4 h-4 mr-1 text-white" />
                {likes}
              </Button>
              <Button
                variant={userVote === "dislike" ? "default" : "outline"}
                size="sm"
                onClick={handleDislike}
                className={`${userVote === "dislike"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-white/30 text-white hover:bg-white/10"
                  } bg-transparent border cursor-pointer`}
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                {dislikes}
              </Button>
            </div>
          </div>
        </div>

        {/* Episode Description */}
        <Card className="mb-8 text-white bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle>Episode Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-white/90">{episode.fullDescription || episode.description}</p>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="text-white bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle>Comments ({comments.length})</CardTitle>
            <CardDescription className="text-white/70">Share your thoughts about this episode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Comment Form */}
            <div className="p-4 space-y-4 rounded-lg bg-white/5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-white bg-white/10 border-white/20 placeholder:text-white/50"
                />
              </div>
              <Textarea
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || !userName.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="py-8 text-center text-white/70">No comments yet. Be the first to share your thoughts!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-white/70" />
                      <span className="font-semibold text-white">{comment.name}</span>
                      <span className="text-sm text-white/50">{comment.timestamp}</span>
                    </div>
                    <p className="text-white/90">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
