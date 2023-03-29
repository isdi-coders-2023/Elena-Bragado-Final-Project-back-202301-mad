export interface ProfessionalRepo<P> {
  query(): Promise<P[]>;
  queryId(id: string): Promise<P>;
  create(info: Partial<P>): Promise<P>;
  update(info: Partial<P>): Promise<P>;
  delete(id: string): Promise<void>;
}
