export interface Equipment {
  id: number;
  name: string;
  type: string;
  description: string;
  construction_number: number;
  construction_year: string;
  image?: string | null;
}
