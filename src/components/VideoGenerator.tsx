
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Loader2, FileText, Sliders, Film, Play, Mic } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define schema using Zod for form validation
const formSchema = z.object({
  script: z.string().min(1, "Script is required"),
  voiceStyle: z.string().default("Default"),
  voiceSpeed: z.number().min(0.5).max(2).default(1),
  voiceTone: z.string().default("Neutral"),
  pauseBeforeTactic: z.boolean().default(false),
  tacticType: z.string().default("Build-Up"),
  teamPerspective: z.string().default("Attacking"),
  highlightPlayer: z.string().optional(),
  fieldStyle: z.string().default("2D Tactics Board"),
  arrowStyle: z.string().default("Solid"),
  highlightZones: z.boolean().default(false),
  addCaptions: z.boolean().default(true),
  addMusic: z.boolean().default(false),
  duration: z.number().min(15).max(90).default(45),
  resolution: z.string().default("1080p"),
  outputFormat: z.string().default("mp4"),
});

type FormValues = z.infer<typeof formSchema>;

const VideoGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [sectionsOpen, setSectionsOpen] = useState({
    voice: true,
    tactics: false,
    visual: false,
    output: false,
  });
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      script: "",
      voiceStyle: "Default",
      voiceSpeed: 1,
      voiceTone: "Neutral",
      pauseBeforeTactic: false,
      tacticType: "Build-Up",
      teamPerspective: "Attacking",
      highlightPlayer: "",
      fieldStyle: "2D Tactics Board",
      arrowStyle: "Solid",
      highlightZones: false,
      addCaptions: true,
      addMusic: false,
      duration: 45,
      resolution: "1080p",
      outputFormat: "mp4",
    },
  });

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API request
      console.log("Submitting form data:", data);
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
      console.error("Error generating video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Football AI Video Studio</h1>
        <p className="text-muted-foreground">
          Turn your analysis scripts into videos — no editing needed
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Create New Video</CardTitle>
              <CardDescription>
                Fill in the details below to generate your football analysis video
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Script Section */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Script</h3>
                </div>
                <FormField
                  control={form.control}
                  name="script"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Football Analysis</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your football analysis script here..."
                          className="min-h-32 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Voice Settings Section */}
              <Collapsible
                open={sectionsOpen.voice}
                onOpenChange={() => toggleSection('voice')}
                className="border rounded-lg p-4"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center">
                      <Mic className="h-5 w-5 mr-2 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Voice Settings</h3>
                    </div>
                    {sectionsOpen.voice ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="voiceStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Voice Style</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select voice style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Default">Default</SelectItem>
                              <SelectItem value="Energetic">Energetic</SelectItem>
                              <SelectItem value="Calm">Calm</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="voiceTone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Voice Tone</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select voice tone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Neutral">Neutral</SelectItem>
                              <SelectItem value="Excited">Excited</SelectItem>
                              <SelectItem value="Serious">Serious</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="voiceSpeed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Voice Speed: {field.value.toFixed(1)}x</FormLabel>
                        <FormControl>
                          <Slider
                            min={0.5}
                            max={2}
                            step={0.1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>Adjust how fast the narration plays (0.5x to 2x)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pauseBeforeTactic"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Pause Before Tactics</FormLabel>
                          <FormDescription>
                            Add a brief pause before showing the main tactical animation
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CollapsibleContent>
              </Collapsible>

              {/* Tactics Settings Section */}
              <Collapsible
                open={sectionsOpen.tactics}
                onOpenChange={() => toggleSection('tactics')}
                className="border rounded-lg p-4"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center">
                      <Sliders className="h-5 w-5 mr-2 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Tactics Settings</h3>
                    </div>
                    {sectionsOpen.tactics ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="tacticType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tactic Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select tactic type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="High Press">High Press</SelectItem>
                              <SelectItem value="Low Block">Low Block</SelectItem>
                              <SelectItem value="Build-Up">Build-Up</SelectItem>
                              <SelectItem value="Counter">Counter Attack</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="teamPerspective"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Perspective</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select perspective" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Attacking">Attacking</SelectItem>
                              <SelectItem value="Defending">Defending</SelectItem>
                              <SelectItem value="Both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="highlightPlayer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highlight Player (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter player name (e.g., Odegaard)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Special focus will be given to this player in the animation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CollapsibleContent>
              </Collapsible>

              {/* Visual Settings Section */}
              <Collapsible
                open={sectionsOpen.visual}
                onOpenChange={() => toggleSection('visual')}
                className="border rounded-lg p-4"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center">
                      <Film className="h-5 w-5 mr-2 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Visual Settings</h3>
                    </div>
                    {sectionsOpen.visual ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fieldStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field Style</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select field style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2D Tactics Board">2D Tactics Board</SelectItem>
                              <SelectItem value="3D Pitch">3D Pitch</SelectItem>
                              <SelectItem value="Dark Theme">Dark Theme</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="arrowStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Arrow Style</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select arrow style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Solid">Solid</SelectItem>
                              <SelectItem value="Dashed">Dashed</SelectItem>
                              <SelectItem value="Pulsing">Pulsing</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="highlightZones"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Highlight Tactical Zones</FormLabel>
                          <FormDescription>
                            Emphasize important areas of the pitch during analysis
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CollapsibleContent>
              </Collapsible>

              {/* Output Settings Section */}
              <Collapsible
                open={sectionsOpen.output}
                onOpenChange={() => toggleSection('output')}
                className="border rounded-lg p-4"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center">
                      <Play className="h-5 w-5 mr-2 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Output Settings</h3>
                    </div>
                    {sectionsOpen.output ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="resolution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resolution</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select resolution" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="720p">720p</SelectItem>
                              <SelectItem value="1080p">1080p</SelectItem>
                              <SelectItem value="4K">4K</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="outputFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Output Format</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select output format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mp4">MP4</SelectItem>
                              <SelectItem value="gif">GIF</SelectItem>
                              <SelectItem value="webm">WebM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration: {field.value} seconds</FormLabel>
                        <FormControl>
                          <Slider
                            min={15}
                            max={90}
                            step={5}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>Video length from 15 to 90 seconds</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="addCaptions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Add Captions</FormLabel>
                            <FormDescription>
                              Display subtitles in the video
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addMusic"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Add Background Music</FormLabel>
                            <FormDescription>
                              Include light sports background music
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
            <CardFooter>
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
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Generate Video
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      
      {/* Video Preview Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Film className="mr-2 h-5 w-5" />
          Video Preview
        </h2>
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
