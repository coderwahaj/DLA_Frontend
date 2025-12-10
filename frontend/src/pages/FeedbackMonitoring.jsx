import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockFeedback = [
    {
        name: 'Ahmed Khan',
        rating: 5,
        time: '2 hours ago',
        category: 'Property Law',
        comment: 'Very helpful service! Got accurate information about property laws in Pakistan.',
    },
    {
        name: 'Fatima Ali',
        rating: 4,
        time: '5 hours ago',
        category: 'Corporate Law',
        comment: 'Good response but could be faster. Overall satisfied with the legal advice.',
    },
    {
        name: 'Muhammad Usman',
        rating: 3,
        time: '1 day ago',
        category: 'Tax Law',
        comment: 'The information was helpful but I needed more details on tax regulations.',
    },
];

const ratingDistribution = [
    { stars: 5, percentage: 45, count: 567 },
    { stars: 4, percentage: 30, count: 378 },
    { stars: 3, percentage: 15, count: 189 },
    { stars: 2, percentage: 7, count: 88 },
    { stars: 1, percentage: 3, count: 38 },
];

export const FeedbackMonitoring = () => {
    const renderStars = (rating) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${star <= rating ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-muted-foreground/30'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Feedback Monitoring</h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">Track and analyze user feedback to improve the service</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                                Total Feedback
                            </p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">1,247</h3>
                        </div>
                        <div className="p-2 sm:p-3 rounded-lg" style={{ backgroundColor: '#DBEAFE' }}>
                            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#2563EB' }} />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                                Average Rating
                            </p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">4.2</h3>
                        </div>
                        <div className="p-2 sm:p-3 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
                            <Star className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#CA8A04' }} />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                                Response Rate
                            </p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">87%</h3>
                        </div>
                        <div className="p-2 sm:p-3 rounded-lg" style={{ backgroundColor: '#DCFCE7' }}>
                            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#22C55E' }} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Feedback */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mockFeedback.map((feedback, index) => (
                        <div key={index} className="p-3 sm:p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2">
                                <div>
                                    <h4 className="font-semibold text-foreground text-sm sm:text-base">{feedback.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        {renderStars(feedback.rating)}
                                        <span className="text-xs text-muted-foreground">{feedback.time}</span>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 text-xs w-fit">
                                    {feedback.category}
                                </Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-2">{feedback.comment}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Rating Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {ratingDistribution.map((item) => (
                            <div key={item.stars} className="flex items-center gap-2 sm:gap-4">
                                <div className="flex items-center gap-1 w-10 sm:w-12">
                                    <span className="text-xs sm:text-sm font-medium">{item.stars}</span>
                                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-[#FBBF24] text-[#FBBF24]" />
                                </div>
                                <div className="flex-1">
                                    <div className="h-5 sm:h-6 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-muted-foreground w-10 sm:w-12 text-right">
                                    {item.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>);
};
export default FeedbackMonitoring;