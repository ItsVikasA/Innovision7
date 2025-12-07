"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame, Award, Zap, Crown, Medal, Target, Moon, Sun, Users } from "lucide-react";
import * as Icons from "lucide-react";

export default function GamificationDashboard({ userId }) {
  const [stats, setStats] = useState({
    xp: 0,
    level: 1,
    streak: 0,
    badges: [],
    rank: 0,
    achievements: []
  });

  useEffect(() => {
    if (userId) {
      fetchGamificationStats();
    }
  }, [userId]);

  const fetchGamificationStats = async () => {
    try {
      const res = await fetch(`/api/gamification/stats?userId=${userId}`);
      const data = await res.json();
      setStats(data || {
        xp: 0,
        level: 1,
        streak: 0,
        badges: [],
        rank: 0,
        achievements: []
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const xpToNextLevel = stats.level * 1000;
  const xpProgress = (stats.xp % 1000) / 10;

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Level Card */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Crown className="h-4 w-4 text-yellow-500" />
              Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.level}</div>
            <p className="text-xs text-muted-foreground">{stats.xp} XP</p>
          </CardContent>
        </Card>

        {/* Streak Card */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Flame className="h-4 w-4 text-orange-500" />
              Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.streak}</div>
            <p className="text-xs text-muted-foreground">days</p>
          </CardContent>
        </Card>

        {/* Rank Card */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Trophy className="h-4 w-4 text-blue-500" />
              Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">#{stats.rank || "N/A"}</div>
            <p className="text-xs text-muted-foreground">global</p>
          </CardContent>
        </Card>

        {/* Badges Card */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Award className="h-4 w-4 text-purple-500" />
              Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{stats.badges?.length || 0}</div>
            <p className="text-xs text-muted-foreground">earned</p>
          </CardContent>
        </Card>
      </div>

      {/* XP Progress */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Progress to Level {stats.level + 1}</CardTitle>
            <span className="text-xs text-muted-foreground">{stats.xp % 1000} / {xpToNextLevel}</span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={xpProgress} className="h-2" />
        </CardContent>
      </Card>

      {/* Badges Collection */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Badge Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {BADGES.map((badge) => {
              const earned = stats.badges?.includes(badge.id);
              const IconComponent = Icons[badge.icon];
              return (
                <div
                  key={badge.id}
                  className={`p-2 border rounded text-center transition-all ${
                    earned 
                      ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-950" 
                      : "opacity-40 grayscale"
                  }`}
                  title={`${badge.name}: ${badge.description}`}
                >
                  {IconComponent && <IconComponent className="h-6 w-6 mx-auto text-yellow-500" />}
                  <div className="text-[10px] mt-1 truncate">{badge.name}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.achievements && stats.achievements.length > 0 ? (
            <div className="space-y-2">
              {stats.achievements.slice(0, 3).map((achievement, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 border rounded">
                  <Medal className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{achievement.description}</div>
                  </div>
                  <Badge className="text-xs">+{achievement.xp}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-xs text-muted-foreground">
              No achievements yet. Complete courses to earn achievements!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const BADGES = [
  { id: "first_course", name: "First Steps", icon: "Target", description: "Complete first course" },
  { id: "week_streak", name: "Dedicated", icon: "Flame", description: "7-day streak" },
  { id: "perfect_score", name: "Perfectionist", icon: "Award", description: "100% on quiz" },
  { id: "fast_learner", name: "Speed Demon", icon: "Zap", description: "Complete course in 1 day" },
  { id: "night_owl", name: "Night Owl", icon: "Moon", description: "Study after midnight" },
  { id: "early_bird", name: "Early Bird", icon: "Sun", description: "Study before 6 AM" },
  { id: "social", name: "Social Butterfly", icon: "Users", description: "Help 10 students" },
  { id: "master", name: "Master", icon: "Crown", description: "Reach level 10" },
];
