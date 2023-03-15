export interface Repo<H> {
  search(query: { key: string; value: unknown }): Promise<H[]>;
  create(_info: Partial<H>): Promise<H>;
}
