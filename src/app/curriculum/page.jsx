"use client";
import { useState } from 'react';
import CurriculumSelector from '@/components/CurriculumSelector';

export default function CurriculumPage() {
  const [selection, setSelection] = useState(null);

  const handleSelectionChange = (data) => {
    setSelection(data);
    console.log('Selected Curriculum:', data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Curriculum Browser</h1>
        <p className="text-muted-foreground">
          Browse curriculum from LKG to Class 12 for CBSE and State boards
        </p>
      </div>

      <CurriculumSelector onSelectionChange={handleSelectionChange} />

      {selection && selection.subjects.length > 0 && (
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Current Selection:</h3>
          <p>Class: {selection.class}</p>
          <p>Board: {selection.board}</p>
          {selection.stream && <p>Stream: {selection.stream}</p>}
          <p>Total Subjects: {selection.subjects.length}</p>
        </div>
      )}
    </div>
  );
}
