
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VideoGenerator = () => {
  const [script, setScript] = useState("");
  const [voiceStyle, setVoiceStyle] = useState("Default");
  const [backgroundType, setBackgroundType] = useState("Animated Tactics");
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!script.trim()) {
      toast({
        title: "Script Required",
        description: "Please enter your football analysis script.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Placeholder for actual API response
      const mockVideoUrl = "https://example.com/sample-video.mp4";
      setVideoUrl(mockVideoUrl);
      
      toast({
        title: "Video Generated",
        description: "Your football analysis video is ready to view!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Football AI Video Studio</h1>
        <p className="text-muted-foreground">
          Turn your analysis scripts into videos — no editing needed
        </p>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Create New Video</CardTitle>
          <CardDescription>
            Fill in the details below to generate your football analysis video
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="script">Script</Label>
              <Textarea
                id="script"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Paste your football analysis script here..."
                className="min-h-32 resize-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voice-style">Voice Style</Label>
                <Select 
                  value={voiceStyle} 
                  onValueChange={setVoiceStyle}
                >
                  <SelectTrigger id="voice-style">
                    <SelectValue placeholder="Select a voice style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Default">Default</SelectItem>
                    <SelectItem value="Energetic">Energetic</SelectItem>
                    <SelectItem value="Calm">Calm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="background-type">Background Type</Label>
                <Select 
                  value={backgroundType}
                  onValueChange={setBackgroundType}
                >
                  <SelectTrigger id="background-type">
                    <SelectValue placeholder="Select background type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Animated Tactics">Animated Tactics</SelectItem>
                    <SelectItem value="Static Pitch with Captions">Static Pitch with Captions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Video...
                </>
              ) : (
                "Generate Video"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Video Preview Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Video Preview</h2>
        <Card className="overflow-hidden bg-muted/40 min-h-[240px] flex items-center justify-center">
          {videoUrl ? (
            <video 
              className="w-full h-full" 
              controls
              src={videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">
                Your generated video will appear here
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default VideoGenerator;
