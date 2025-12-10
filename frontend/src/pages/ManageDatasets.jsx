import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Upload, Pencil, Trash2 } from 'lucide-react';

const mockDatasets = [
    {
        title: 'Financial Regulations 2023',
        description: 'Comprehensive dataset of financial regulations...',
        lastUpdated: 'May 15, 2023',
        status: 'Active',
    },
    {
        title: 'Corporate Tax Law Cases',
        description: 'Collection of landmark corporate tax law...',
        lastUpdated: 'Apr 28, 2023',
        status: 'Active',
    },
    {
        title: 'Banking Statutes Update',
        description: 'Updated banking statutes including rec...',
        lastUpdated: 'May 22, 2023',
        status: 'Pending',
    },
    {
        title: 'Securities Law Compilation',
        description: 'Compilation of securities law with annot...',
        lastUpdated: 'May 10, 2023',
        status: 'Error',
    },
    {
        title: 'International Trade Regulations',
        description: 'Dataset covering international trade reg...',
        lastUpdated: 'May 18, 2023',
        status: 'Active',
    },
];

const validationStats = [
    { label: 'Validated Datasets', value: 42, color: 'border-success' },
    { label: 'Pending Validation', value: 7, color: 'border-warning' },
    { label: 'Validation Errors', value: 3, color: 'border-error' },
    { label: 'Total Datasets', value: 52, color: 'border-foreground' },
];

export const ManageDatasets = () => {
    const handleAction = (action, dataset) => {
        console.log(`${action} dataset:`, dataset);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "text-[#2C7A3E]";
            case "Pending":
                return "text-[#D19A00]";
            case "Error":
                return "text-[#D12A2A]";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Manage Legal Datasets</h1>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">Upload and manage legal datasets for the chatbot</p>
                </div>
                <Button className="bg-primary hover:bg-primary-hover text-primary-foreground w-full sm:w-auto">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Dataset
                </Button>
            </div>

            {/* All Datasets */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">All Datasets</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[150px]">Title</TableHead>
                                    <TableHead className="min-w-[200px] hidden sm:table-cell">Description</TableHead>
                                    <TableHead className="min-w-[120px]">Last Updated</TableHead>
                                    <TableHead className="min-w-[100px]">Status</TableHead>
                                    <TableHead className="text-right min-w-[120px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockDatasets.map((dataset, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{dataset.title}</TableCell>
                                        <TableCell className="text-muted-foreground hidden sm:table-cell">{dataset.description}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">{dataset.lastUpdated}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`
                                                    bg-[#E5E7EB]
                                                    ${getStatusColor(dataset.status)}
                                                    w-[63.34px]
                                                    h-[18px]
                                                    flex items-center justify-center
                                                    rounded-full
                                                    text-xs font-medium
                                                    px-0 py-0
                                                `}
                                            >
                                                {dataset.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleAction('edit', dataset)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleAction('delete', dataset)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Dataset Validation Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Dataset Validation Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {validationStats.map((stat, index) => (
                            <div
                                key={index}
                                className={`p-4 sm:p-6 rounded-lg border-l-4 bg-card ${stat.color}`}
                            >
                                <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageDatasets;