import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  MessageSquare,
  Brain,
  TrendingUp
} from '@phosphor-icons/react';

import { Material, MaterialRequirements, UserFeedback } from '@/types/materials';
import { MLFeedbackService } from '@/services/mlFeedbackService';

interface FeedbackCollectorProps {
  material: Material;
  requirements: MaterialRequirements;
  sessionId: string;
  applicationContext?: string;
  onFeedbackSubmitted?: () => void;
}

export function FeedbackCollector({
  material,
  requirements,
  sessionId,
  applicationContext,
  onFeedbackSubmitted
}: FeedbackCollectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<UserFeedback['feedbackType']>('rating');
  const [rating, setRating] = useState<number>(3);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickFeedback = async (type: 'positive' | 'negative') => {
    setIsSubmitting(true);
    try {
      await MLFeedbackService.recordFeedback({
        sessionId,
        materialId: material.id,
        requirements,
        feedbackType: 'selection',
        selected: type === 'positive',
        applicationContext,
        comments: type === 'positive' ? 'Quick positive feedback' : 'Quick negative feedback'
      });

      toast.success(`Feedback recorded! This helps improve our recommendations.`);
      onFeedbackSubmitted?.();
    } catch (error) {
      toast.error('Failed to record feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDetailedFeedback = async () => {
    setIsSubmitting(true);
    try {
      await MLFeedbackService.recordFeedback({
        sessionId,
        materialId: material.id,
        requirements,
        feedbackType,
        rating: feedbackType === 'rating' ? rating : undefined,
        selected: feedbackType === 'selection' ? rating >= 4 : undefined,
        applicationContext,
        comments: comments || undefined
      });

      toast.success('Detailed feedback submitted! Thank you for helping improve our AI.');
      setIsOpen(false);
      setComments('');
      setRating(3);
      onFeedbackSubmitted?.();
    } catch (error) {
      toast.error('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Quick Feedback Buttons */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleQuickFeedback('positive')}
        disabled={isSubmitting}
        className="flex items-center gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
      >
        <ThumbsUp size={14} />
        Helpful
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleQuickFeedback('negative')}
        disabled={isSubmitting}
        className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <ThumbsDown size={14} />
        Not Helpful
      </Button>

      {/* Detailed Feedback Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
          >
            <MessageSquare size={14} />
            Detailed
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain size={20} className="text-primary" />
              Improve AI Recommendations
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Material: {material.name}</h4>
              <p className="text-xs text-muted-foreground">
                Your feedback helps train our AI to provide better recommendations for similar applications.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Feedback Type</Label>
                <RadioGroup
                  value={feedbackType}
                  onValueChange={(value) => setFeedbackType(value as UserFeedback['feedbackType'])}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rating" id="rating" />
                    <Label htmlFor="rating" className="text-sm">Rate this recommendation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="selection" id="selection" />
                    <Label htmlFor="selection" className="text-sm">Would you select this material?</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Rating Stars */}
              {feedbackType === 'rating' && (
                <div>
                  <Label className="text-sm font-medium">Rating</Label>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto"
                        onClick={() => setRating(star)}
                      >
                        <Star
                          size={20}
                          className={`${
                            star <= rating 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-gray-300'
                          }`}
                        />
                      </Button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {rating}/5 stars
                    </span>
                  </div>
                </div>
              )}

              {/* Selection for selection type */}
              {feedbackType === 'selection' && (
                <div>
                  <Label className="text-sm font-medium">Would you select this material?</Label>
                  <RadioGroup
                    value={rating >= 4 ? 'yes' : 'no'}
                    onValueChange={(value) => setRating(value === 'yes' ? 5 : 2)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="text-sm">Yes, I would select this</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="text-sm">No, I would not select this</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <div>
                <Label htmlFor="comments" className="text-sm font-medium">
                  Comments (Optional)
                </Label>
                <Textarea
                  id="comments"
                  placeholder="What factors influenced your decision? Any specific concerns or benefits?"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDetailedFeedback}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <TrendingUp size={16} />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MLInsightsProps {
  className?: string;
}

export function MLInsights({ className }: MLInsightsProps) {
  const [stats, setStats] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadMLStats = async () => {
    setIsLoading(true);
    try {
      const [statsData, performanceData] = await Promise.all([
        MLFeedbackService.getTrainingStats(),
        MLFeedbackService.getModelPerformance()
      ]);
      setStats(statsData);
      setPerformance(performanceData);
    } catch (error) {
      console.error('Failed to load ML stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadMLStats();
  }, []);

  if (!stats && !isLoading) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain size={20} className="text-primary" />
          AI Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Loading insights...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stats && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.totalFeedback}</div>
                  <div className="text-xs text-muted-foreground">User Feedback</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{stats.trainingExamples}</div>
                  <div className="text-xs text-muted-foreground">Training Examples</div>
                </div>
              </div>
            )}

            {performance && (
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-sm font-medium mb-2">Model Performance</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Accuracy: {Math.round(performance.accuracy * 100)}%</div>
                  <div>Training Size: {performance.trainingSize} examples</div>
                  <div>
                    Last Training: {
                      performance.lastTrainingDate 
                        ? new Date(performance.lastTrainingDate).toLocaleDateString()
                        : 'Never'
                    }
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              <p>
                Your feedback helps improve recommendations for all users. 
                The AI learns from patterns in user preferences and material performance.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}