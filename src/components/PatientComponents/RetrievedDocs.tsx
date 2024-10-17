import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from './StatusIndicator'; // Ensure this component is created

interface RetrievedDoc {
  item: {
    id: string;
    document: string;
    embeddings: null;
    meta: {
      guideline: string;
    };
  };
  score: number;
}

interface RetrievedDocsProps {
  docs: string; // Stringified JSON of retrieved docs
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
}

const RetrievedDocs: React.FC<RetrievedDocsProps> = ({ docs, verified, lgtm, onUpdate }) => {
  const [selectedDoc, setSelectedDoc] = useState<RetrievedDoc | null>(null);

  const parsedDocs: RetrievedDoc[] = JSON.parse(docs);

  const extractLabel = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length - 2]; // Get the second to last part of the path
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-md font-semibold">Retrieved Docs</CardTitle>
        <StatusIndicator
          verified={verified}
          lgtm={lgtm}
          onThumbsUp={() => onUpdate(true, true)}
          onThumbsDown={() => onUpdate(true, false)}
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60 pr-4">
          <div className="space-y-2">
            {parsedDocs.map((doc, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <span>{extractLabel(doc.item.id)}</span>
                    <span className="text-sm text-gray-500">Score: {doc.score.toFixed(2)}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{extractLabel(doc.item.id)}</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="mt-2 h-[200px] w-full rounded-md border p-4">
                    <p>{doc.item.meta.guideline || "No guideline available"}</p>
                  </ScrollArea>
                  <div className="mt-2 text-sm text-gray-500">
                    Score: {doc.score.toFixed(4)}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RetrievedDocs;