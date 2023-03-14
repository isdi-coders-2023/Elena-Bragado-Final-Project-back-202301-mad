export type Category = 'carpenter' | 'electrician' | 'plumber';
export type Assessment = 1 | 2 | 3 | 4 | 5;

export type Professional = {
  id: string;
  email: string;
  company: string;
  category: Category;
  assessment: Assessment;
  Telephone: number;
  Description: string;
};
