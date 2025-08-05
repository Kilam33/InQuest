interface Article {
    id: number;
    identifiers: { identifier: string; type: string }[];
    title: string;
    language: { code: string; name: string };
    magId: string | null;
    oaiIds: string[];
    publishedDate: string;
    publisher: string;
    pubmedId: string | null;
    references: string[];
    sourceFulltextUrls: string[];
    updatedDate: string;
    yearPublished: number;
    journals: string[];
    links: { type: string; url: string }[];
    acceptedDate: string;
    arxivId: string | null;
    authors: { name: string }[];
    citationCount: number;
    contributors: string[];
    outputs: string[];
    createdDate: string;
    dataProviders: { id: number; name: string; url: string; logo: string }[];
    depositedDate: string;
    abstract: string;
    documentType: string;
    doi: string | null;
    downloadUrl: string;
    fieldOfStudy: string | null;
    fullText: string;
  }

  export interface Note {
    iid: number;
    text: string;
    timestamp: string;
    selection: string;
    tags: string[];
  }
  